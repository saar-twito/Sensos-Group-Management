import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IGroup } from '../../interfaces/Group/interface'
import style from './style.module.scss'
import DraggableGroup from '../../components/DraggableGroup/DraggableGroup'
import GroupForm from '../../components/GroupForm/GroupForm'
import SectionHeader from '../../components/SectionHeader/SectionHeader'

const groupsArray: IGroup[] = [
  { id: 1, name: 'Group 1', description: 'This is group 1', priority: 1 },
]

const GroupDashboard = () => {
  const [groups, setGroups] = useState<IGroup[]>(() => {
    const savedGroups = localStorage.getItem('groups')
    return savedGroups ? JSON.parse(savedGroups) : groupsArray
  })

  // Save groups to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  const addGroup = (name: string, description: string) => {
    const newGroup = {
      id: groups.length + 1, // Ensure id is unique and static
      name,
      description,
      priority: groups.length + 1 // Set priority as the last in the list
    }

    setGroups([...groups, newGroup])
  }


  /**
   * @description Function to move a group from one index to another in the list
   * @param initialIndex is the start index of the dragged group from which it is moved initially
   * @param hoverIndex is the index where the dragged group is currently hovering over
   */
  const moveGroup = (initialIndex: number, hoverIndex: number) => {
    const draggedGroup = groups[initialIndex];
    const newGroups = [...groups];

    // Remove the dragged group from its original position
    newGroups.splice(initialIndex, 1);

    // Insert the dragged group at the new position
    newGroups.splice(hoverIndex, 0, draggedGroup);

    // Update the priority based on the new order
    newGroups.forEach((group, index) => {
      group.priority = index + 1; // Update priority based on the new index
    })

    setGroups(newGroups);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.container}>
        <SectionHeader
          title="Create a new group"
          description={'The "Create a New Group" form simplifies adding a new group. Enter a name and description, click "Add Group," and it appears at the list\'s end.'} />
        <GroupForm addGroup={addGroup} />

        <SectionHeader
          title="List of all groups"
          description={'The "List of All Groups" shows your groups, sorted by priority. You can rearrange them by dragging the handle, making management easy and intuitive.'} />

        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ width: 0 }}></th> {/* Static number column */}
              <th style={{ width: 0 }}></th> {/* dragHandle column */}
              <th>Name</th>
              <th>Description</th>
              <th>Group's Overview</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <DraggableGroup
                key={group.id}
                index={index}
                group={group}
                moveGroup={moveGroup}
                number={index + 1} // Pass static number to the component
              />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  )
}

export default GroupDashboard
