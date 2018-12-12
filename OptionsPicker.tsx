import * as React from 'react';
import styles from './OptionsPicker.module.scss';
import { IOptionsPickerProps } from './IOptionsPickerProps';
import colors from './colors';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { createRef } from '@uifabric/utilities/lib';
import { IOptionsPickerState } from './IOptionsPickerState';
import OptionsPickerMenu from './OptionsPickerMenu/OptionsPickerMenu';
import { IOptionsPickerOption } from './OptionsPickerMenu/IOptionsPickerMenuProps';

export class OptionsPicker extends React.Component<IOptionsPickerProps, IOptionsPickerState> {
  private _menuButtonElement = createRef<HTMLElement>();

  constructor(props: IOptionsPickerProps) {
    super(props);
    this.state = {
      callout: false,
    };

    this._onToggleCalloutClick = this._onToggleCalloutClick.bind(this);
  }

  public render() {
    const { options } = this.props;
    let activeOption: IOptionsPickerOption;
    activeOption = typeof this.props.activeOption === "number" ?
      options.find(option => option.id === this.props.activeOption) :
      this.props.activeOption;

    return (
      <div className={styles.optionsPicker}>
        <button
          ref={this._menuButtonElement}
          onClick={this._onToggleCalloutClick}
        >
          {this.props.children ||
            <div
              className={styles.activeOption}
              style={
                activeOption && activeOption.id ?
                  { backgroundColor: activeOption.color && colors[activeOption.color] } :
                  {}
              }
            >
              {activeOption && activeOption.title || ""}
            </div>
          }
        </button>
        <Callout
          className="ms-CalloutExample-callout"
          ariaLabelledBy={'callout-label-1'}
          ariaDescribedBy={'callout-description-1'}
          role={'alertdialog'}
          gapSpace={0}
          target={this._menuButtonElement.current}
          onDismiss={() => this.setState({ callout: false })}
          setInitialFocus={true}
          hidden={!this.state.callout}
        >
          <OptionsPickerMenu
            closeCallback={() => this.setState({ callout: false })}
            activeOptionId={activeOption && activeOption.id}
            options={options || []}
            onSelect={this.props.onSelect}
            onSaveChange={this.props.onSaveChange}
            editable={this.props.editable}
          />
        </Callout>
      </div>
    );
  }

  private _onToggleCalloutClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState(prevState => ({ callout: !prevState.callout }));
    // this.props.onClick(e);
  }
}
