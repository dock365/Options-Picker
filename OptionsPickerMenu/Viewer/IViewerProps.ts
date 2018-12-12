import { IOptionsPickerOption } from '../IOptionsPickerMenuProps';

export interface IStatusViewerProps {
  onSelect: (e: any) => void;
  toggleEdit?: () => void;
  options: IOptionsPickerOption[];
  editable?: boolean;
}
