import { IOptionsPickerOption } from "./OptionsPickerMenu/IOptionsPickerMenuProps";

export interface IOptionsPickerProps {
  options: IOptionsPickerOption[];
  activeOption: IOptionsPickerOption | number;
  onSelect?: (option: IOptionsPickerOption) => void;
  onSaveChange?: (options: IOptionsPickerOption[], deletedIds: number[]) => void;
  editable?: boolean;
}
