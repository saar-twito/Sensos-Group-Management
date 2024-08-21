import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IGroup } from '../../interfaces/Group/interface'
import style from './style.module.scss'
import DraggableGroup from '../../components/DraggableGroup/DraggableGroup'
import GroupForm from '../../components/GroupForm/GroupForm'
import SectionHeader from '../../components/SectionHeader/SectionHeader'


const GroupDashboard = () => {
  const [groups, setGroups] = useState<IGroup[]>([
    { id: 1, name: 'Group 1', description: 'This is group 1' },
    { id: 2, name: 'Group 2', description: 'This is group 2' },
    { id: 3, name: 'Group 3', description: 'This is group 3' }
  ])

  const addGroup = (name: string, description: string) => {
    const newGroup = {
      id: groups.length + 1,
      name,
      description,
    }
    setGroups([...groups, newGroup])
  }

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
        <SectionHeader
          title="Create a new group"
          description={'The "Create a New Group" form makes it easy to add a new group. Just enter a name and description, hit "Add Group," and it pops up at the bottom of the list. Simple and smooth!'} />
        <GroupForm addGroup={addGroup} />

        <>
          <SectionHeader
            title="List of all groups"
            description={'The "List of All Groups" displays all the groups you\'ve added, organized by priority. You can easily rearrange them by dragging the handle beside each group. The list is clean and easy to navigate, ensuring you can manage your groups effortlessly.'} />

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
        </>

      </div>
    </DndProvider>
  )
}

export default GroupDashboard
