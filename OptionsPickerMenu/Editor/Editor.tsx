import * as React from 'react';
import styles from './Editor.module.scss';
import colors, { statusColors } from '../../colors';
import { IEditorProps } from './IEditorProps';
import { IEditorState } from './IEditorState';
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';

export default class Editor extends React.Component<
  IEditorProps,
  IEditorState> {
  constructor(props: IEditorProps) {
    super(props);

    this.state = {
      options: props.options,
      deletedOptions: [],
      availableColors: Object.keys(statusColors),
    };

    this._onColorSelect = this._onColorSelect.bind(this);
    this._saveChanges = this._saveChanges.bind(this);
    this._cancelChanges = this._cancelChanges.bind(this);
    this._onStatusRemoveClick = this._onStatusRemoveClick.bind(this);
  }

  public componentDidMount() {
    if (this.props.options.length > 0)
      this.setState(
        { options: this.props.options },
        () => this._calculateAvailableColors(),
      );
  }

  public componentDidUpdate(prevProps: IEditorProps, prevState: IEditorState) {
    if (prevProps.options.length !== this.props.options.length)
      this.setState(
        { options: this.props.options },
        () => this._calculateAvailableColors(),
      );
  }

  public render() {
    const { options } = this.state;
    const widthOfAStatus = 150;
    const noOfStatusesInAColumn = 4;
    const noOfStatuses = options.length;

    let width =
      (Math.ceil(noOfStatuses / noOfStatusesInAColumn) * widthOfAStatus) +
      (noOfStatuses % noOfStatusesInAColumn === 0 ? widthOfAStatus : 0);

    width = width < widthOfAStatus * 2 ? widthOfAStatus * 2 : width;

    return (
      <div style={{ width: `${width}px` }}>
        <div className={`${styles.optionContainer}`}>
          {options.map(status =>
            <div className={styles.optionItem} key={status.color}>
              <div
                className={styles.colorIndicator}
                style={{ backgroundColor: status.color && colors[status.color] || status.color }} />
              <input
                onChange={(e) => this._onStatusValueChange(e.target.value, status.color || "")}
                value={status.title}
                placeholder="Label..."
                disabled={status.protected}
              />
              {
                !status.protected ?
                  <ActionButton
                    disabled={status.protected}
                    iconProps={{ iconName: "ChromeClose" }}
                    className={`${styles.deleteOptionBtn}`}
                    value={status.color}
                    onClick={this._onStatusRemoveClick}
                  /> : null
              }
            </div>,
          )}
          {this.state.availableColors.length > 0 ?
            <div className={`${styles.optionItem} ${styles.newOptionItem} `} /> :
            null}
        </div>
        <div className={styles.colorPicker}>
          {this.state.availableColors.map(key =>
            <button
              key={key}
              value={statusColors[key]}
              style={{ backgroundColor: colors[statusColors[key]] }}
              onClick={this._onColorSelect}
              className={styles.colorBtn}
            />,
          )}
        </div>
        <DefaultButton text="Cancel" onClick={this._cancelChanges} className={styles.cancelChangesBtn} />
        <DefaultButton text="Apply" onClick={this._saveChanges} className={styles.applyChangesBtn} />
      </div>
    );
  }

  private _onColorSelect(e: React.MouseEvent<HTMLButtonElement>) {
    const color = e.currentTarget.value;
    if (color)
      this.setState(
        prevState => ({
          options: [...prevState.options, {
            title: "",
            sortingOrder: this.state.options.length + 1,
            color,
          }],
        }),
        () => this._calculateAvailableColors(),
      );
  }

  private _onStatusValueChange(value: string, color: string) {
    this.setState(
      prevState => ({
        options: prevState.options.map(option => option.color === color ? { ...option, title: value } : option),
      }),
    );
  }

  private _saveChanges() {
    if (this.props.onSaveChanges)
      this.props.onSaveChanges(
        this.state.options,
        this.state.deletedOptions,
      );
    if (this.props.toggleEdit)
      this.props.toggleEdit();
  }

  private _cancelChanges() {
    if (this.props.toggleEdit)
      this.props.toggleEdit();
  }

  private _onStatusRemoveClick(e: React.MouseEvent<HTMLInputElement>) {
    const color = e.currentTarget.value;
    this.setState(
      prevState => {
        const deletedOption = prevState.options.find(option => option.color === color);

        return {
          options: prevState.options.filter(status => status.color !== color),
          deletedOptions: deletedOption && deletedOption.id ?
            [...prevState.deletedOptions, deletedOption.id] :
            prevState.deletedOptions,
        };
      },
      () => this._calculateAvailableColors(color),
    );
  }

  private _calculateAvailableColors(newColor?: string) {
    this.setState(prevState => {
      const { availableColors } = prevState;
      if (newColor) {
        availableColors.push(newColor);
      } else {
        prevState.options.forEach(({ color }) => {
          const indexOfColor = color && availableColors.indexOf(color);
          if (indexOfColor !== undefined && indexOfColor !== "" && indexOfColor >= 0)
            availableColors.splice(indexOfColor, 1);
        });
      }

      return { availableColors };
    });
  }
}
