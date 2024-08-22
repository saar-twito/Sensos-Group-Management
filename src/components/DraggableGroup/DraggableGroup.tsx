import { useDrag, useDrop } from 'react-dnd'
import { RxHamburgerMenu } from "react-icons/rx"
import style from './style.module.scss'
import { IDraggableGroup } from '../../interfaces/Group/interface'
import { Link } from 'react-router-dom'

// Define the item type constant for dragging and dropping
const ItemType = 'GROUP'

// Define the draggable group component that can be dragged and dropped in the list
/**
 * 
 * @param group is the group object (name, description, id, priority)
 * @param index is the index of the group in the list
 * @param moveGroup is the function to move the group from one index to another
 * @param number is the priority number of the group
 * @returns a draggable group component that can be dragged and dropped in the list
 */
const DraggableGroup = ({ group, index, moveGroup, number }: IDraggableGroup & { number: number }) => {

  /* 
   When i use the useDrop, it makes the <tr> (row) element a drop target.
   This means that when i drag another row in the table and hover over this <tr>,
   this element will allow the dragged row to be dropped onto it.

   The "ref" is used to get the reference of the element and attached it to the drag functionality.

   accept: ItemType - Accept only items of type GROUP

    hover: When a group is being dragged 
  */
  const [, ref] = useDrop({
    accept: ItemType,
    hover: (hoveredGroupIndex: { index: number }) => {

      if (hoveredGroupIndex.index === index) return;

      // Move the group only if the dragged item is hovering over a different position
      moveGroup(hoveredGroupIndex.index, index);

      // Immediately update the index of the dragged item to the new position
      hoveredGroupIndex.index = index;
    },
  })


  // useDrag is used to make the <tr> (row) element draggable. meaning it can be picked up and moved around.
  const [{ isDragging }, drag] = useDrag({
    type: ItemType, // Accept only items of type GROUP
    item: { index }, // Pass the index of the group as the item. This will be used to identify the group being dragged
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
