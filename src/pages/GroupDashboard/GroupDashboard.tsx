import React, { useState } from 'react'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IGroup, IDraggableGroup } from '../../interfaces/Group/interface'
import style from './style.module.scss'

const ItemType = 'GROUP'

const DraggableGroup: React.FC<IDraggableGroup> = ({ group, index, moveGroup }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveGroup(draggedItem.index, index)
        draggedItem.index = index
      }
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
    >
      <td className={style.priority}>{group.id}</td>
      <td className={`${style.roundedLeft} ${style.dragHandle} ${style.gray}`}>☰</td>
      <td className={`${style.gray}`}>{group.name}</td>
      <td className={`${style.roundedRight} ${style.gray}`}>{group.description}</td>
    </tr>
  )
}

const GroupDashboard = () => {
  const [groups, setGroups] = useState<IGroup[]>([
    { id: 1, name: 'Group 1', description: 'This is group 1' },
    { id: 2, name: 'Group 2', description: 'This is group 2' },
    { id: 3, name: 'Group 3', description: 'This is group 3' }
  ])

  const moveGroup = (dragIndex: number, hoverIndex: number) => {
    const draggedGroup = groups[dragIndex]
    const newGroups = [...groups]
    newGroups.splice(dragIndex, 1)
    newGroups.splice(hoverIndex, 0, draggedGroup)

    // Update IDs to reflect the new order
    newGroups.forEach((group, index) => {
      group.id = index + 1
    })

    setGroups(newGroups)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.container}>
        <h1>Groups</h1>
        <hr />

        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ width: 0 }}></th>
              <th style={{ width: 0 }}></th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <DraggableGroup
                key={group.id}
                index={index}
                group={group}
                moveGroup={moveGroup}
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  )
}

export default GroupDashboard
