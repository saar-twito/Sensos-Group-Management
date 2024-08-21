import { useDrag, useDrop } from 'react-dnd'
import { RxHamburgerMenu } from "react-icons/rx"
import style from './style.module.scss'
import { IDraggableGroup } from '../../interfaces/Group/interface'

// Define the item type constant for dragging and dropping
const ItemType = 'GROUP'

// DraggableGroup component handles the drag&drop functionality for a group
const DraggableGroup = ({ group, index, moveGroup }: IDraggableGroup) => {
  // useDrop hook allows the component to act as a drop target for draggable items
  const [, ref] = useDrop({
    accept: ItemType, // Only accept items of type 'GROUP' 
    hover: (draggedItem: { index: number }) => {

      // When a draggable item is hovered over this component (drop target)
      if (draggedItem.index !== index) {
        // Move the group if the dragged item is not already at this index position
        moveGroup(draggedItem.index, index)

        // Update the index of the dragged item to reflect the new position
        draggedItem.index = index
      }
    },
  })

  // useDrag hook allows the component to act as a draggable
  const [{ isDragging }, drag] = useDrag({
    type: ItemType, // Set the item type to 'GROUP'
    item: { index }, // Pass the index of the item being dragged
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),  // Monitor dragging state to apply styles or other effects
    }),
  })

  return (
    <tr
      ref={(node) => drag(ref(node))}
      className={`${style.row}`}
    >
      <td className={style.priority}>{group.id}</td>
      <td className={`${style.roundedLeft} ${style.dragHandle} ${style.gray}`}><RxHamburgerMenu /></td>
      <td className={`${style.gray}`}>{group.name}</td>
      <td className={`${style.roundedRight} ${style.gray}`}>{group.description}</td>
    </tr>
  )
}

export default DraggableGroup
