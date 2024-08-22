import { Page, Navbar, List, ListItem, Block, Button, Input } from 'framework7-react';
import { useState, ChangeEvent } from 'react';
import { useFamilyStore } from '@/stores/familyStore';
import { useFamilies } from '@/lib/API/familly/fetchFamilies';
import { useSaveFamily } from '@/lib/API/familly/useSaveFamily';
import { useDeleteFamily } from '@/lib/API/familly/useDeleteFamily';
import { FamilyMember } from '@/types/family';

const Family = () => {
  const [newMember, setNewMember] = useState<string>('');
  const { data: families = [], refetch, isError } = useFamilies();
 
  const saveMutation = useSaveFamily({
    mutationConfig: {
      onSuccess: (newFamily: FamilyMember) => {
 
        setNewMember('');
        refetch();
      },
      onError: (error: Error) => {
        console.error('Error creating family:', error);
        setNewMember('');
      },
    },
  });

  const deleteMutation = useDeleteFamily({
    mutationConfig: {
      onSuccess: (deletedId: number) => {
         refetch();
      },
      onError: (error: Error) => {
        console.error('Error deleting family:', error);
      },
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember(e.target.value);
  };
 
  const handleAddButtonClick = () => {
    saveMutation.mutate(newMember);
    };

  const handleDeleteButtonClick = (id: number) => {
    deleteMutation.mutate(id);
    if(!navigator.onLine){
      setNewMember('');
    }
  };


  return (
    <Page name="Family">
      <Navbar title="Family" />
      <Block>
        <Input
          type="text"
          placeholder="Enter your name"
          info="Your First name"
          clearButton
          value={newMember}
          onInput={handleInputChange}
        />
        <Button
          fill
          className="m-1"
          onClick={handleAddButtonClick}
          disabled={saveMutation.isPending && navigator.onLine}
        >
          {saveMutation.isPending && navigator.onLine? 'Adding...' : 'Add Member'}
        </Button>
      </Block>
      <List strong dividersIos outlineIos insetMd>
        {families.length > 0 ? (
          families.map((member) => (
            <ListItem key={member.familyId} title={member.familyName}>
              <Button
                small
                color="red"
                onClick={() => handleDeleteButtonClick(member.familyId)}
              >
                Delete
              </Button>
            </ListItem>
          ))
        ) : (
          <ListItem title="No members found" />
        )}
      </List>
    </Page>
  );
};

export default Family;