import * as React from 'react';
import styles from './Viewer.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IStatusViewerProps } from './IViewerProps';
import colors from '../../colors';

export default class StatusViewer extends React.Component<IStatusViewerProps, {}> {
  public render() {
    const { options } = this.props;
    const widthOfAStatus = 144;
    const noOfOptionsInAColumn = 4;
    const noOfOptions = options.length;
    let width = Math.ceil(noOfOptions / noOfOptionsInAColumn) * widthOfAStatus;
    width = width < widthOfAStatus * 2 ? widthOfAStatus * 2 : width;

    return (
      <div>
        <div className={`${styles.optionContainer}`} style={{ width: `${width}px` }}>
          {options.map(option =>
            <button
              className={styles.optionItem}
              onClick={this.props.onSelect}
              value={option.id}
              style={{ backgroundColor: option.color && colors[option.color] || option.color }}
              title={option.title}
            >{option.title}</button>,
          )}
        </div>
        {this.props.editable ?
          <DefaultButton text="Add / Edit Labels" onClick={this.props.toggleEdit} className={styles.toggleEditBtn} />
          : null}
      </div>
    );
  }
}
