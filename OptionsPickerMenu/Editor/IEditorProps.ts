import { IOptionsPickerOption } from "../IOptionsPickerMenuProps";

export interface IEditorProps {
  toggleEdit?: () => void;
  options: IOptionsPickerOption[];
  availableColors: string[];
  onSaveChanges?: (options: IOptionsPickerOption[], deletedIds: number[]) => void;
}
