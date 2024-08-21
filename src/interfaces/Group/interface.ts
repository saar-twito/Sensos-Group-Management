export interface IGroup {
  id: number;
  name: string;
  description: string;
}

export interface IDraggableGroup {
  group: IGroup
  index: number
  moveGroup: (dragIndex: number, hoverIndex: number) => void
}

