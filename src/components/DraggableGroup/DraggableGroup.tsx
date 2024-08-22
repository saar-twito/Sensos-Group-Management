import { useDrag, useDrop } from 'react-dnd'
import { RxHamburgerMenu } from "react-icons/rx"
import style from './style.module.scss'
import { IDraggableGroup } from '../../interfaces/Group/interface'
import { Link } from 'react-router-dom'

// Define the item type constant for dragging and dropping
const ItemType = 'GROUP'

const DraggableGroup = ({ group, index, moveGroup, number }: IDraggableGroup & { number: number }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index === index) return;

      // Move the group only if the dragged item is hovering over a different position
      moveGroup(draggedItem.index, index);

      // Immediately update the index of the dragged item to the new position
      draggedItem.index = index;
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <tr
      ref={(node) => drag(ref(node))}
      className={`${style.row} ${isDragging ? style.dragging : ''}`}  // Apply dragging style if needed
    >
      <td className={style.priority}>{number}</td>
      <td className={`${style.roundedLeft} ${style.dragHandle} ${style.gray}`}><RxHamburgerMenu /></td>
      <td className={`${style.gray}`}>{group.name}</td>
      <td className={`${style.gray}`}>{group.description}</td>
      <td className={`${style.roundedRight} ${style.gray}`}><Link to={`/group/${group.id}`}>View Details</Link></td>
    </tr>
  )
}

export default DraggableGroup
