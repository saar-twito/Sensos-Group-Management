import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IGroup } from '../../interfaces/Group/interface';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import style from './style.module.scss';

const GroupOverview = () => {
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();
  const { id } = useParams();

  useEffect(() => {
    const groups = localStorage.getItem('groups');
    if (groups) {
      const group = JSON.parse(groups).find((group: IGroup) => group.id === Number(id));
      if (group) {
        setSelectedGroup(group);
      }
    }
  }, [id]);

  return (
    <div className={style.container}>
      <SectionHeader title="Group Overview" description="Here you can view the full details of a group, including the Group ID, Group Name, Group Description, and Priority." />

      <div className={style.groupDetails}>
        <p><span>Group's ID:</span> {selectedGroup?.id}</p>
        <p><span>Group's Priority:</span> {selectedGroup?.priority}</p>
        <p><span>Group's Name:</span> {selectedGroup?.name}</p>
        <p><span>Group's Description:</span> {selectedGroup?.description}</p>
      </div>
    </div>
  );
};

export default GroupOverview;
