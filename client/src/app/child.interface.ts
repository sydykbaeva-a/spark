export interface IChild {
  child_id?: number;
  child_name: string;
  user_id: number;
  checked?: false; // adding child to the habit
  child_edit?: boolean;
}
