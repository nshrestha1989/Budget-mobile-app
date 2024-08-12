import { Page, Navbar, List, ListItem, Block, Button, Input } from 'framework7-react';
import { useState, ChangeEvent } from 'react';
import { useFamilyStore } from '@/stores/familyStore';
import { FamilyMember } from '@/types/family';
import { useFamilies } from '@/lib/API/familly/fetchFamilies';
import { useSaveFamily } from '@/lib/API/familly/useSaveFamily';
import { useDeleteFamily } from '@/lib/API/familly/useDeleteFamily';


const Family = () => {
  const [newMember, setNewMember] = useState<string>('');
  const { members, addMember, removeMember } = useFamilyStore(); // Assuming you have a removeMember action
  const { data: families = [], refetch, isError } = useFamilies();
 console.log(families)
  const saveMutation = useSaveFamily({
    mutationConfig: {
      onSuccess: (newFamily: FamilyMember) => {
        addMember(newFamily);
        setNewMember('');
        refetch();
      },
      onError: (error: Error) => {
        console.error('Error creating family:', error);
        // Handle error appropriately (e.g., show notification)
      },
    },
  });

  const deleteMutation = useDeleteFamily({
    mutationConfig: {
      onSuccess: (deletedId: number) => {
        removeMember(deletedId); 
        refetch(); 
      },
      onError: (error: Error) => {
        console.error('Error deleting family:', error);
        // Handle error appropriately (e.g., show notification)
      },
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember(e.target.value);
  };

  const handleAddButtonClick = () => {
    if (newMember.trim() !== '') {
      saveMutation.mutate(newMember); // Pass the string directly
    }
  };

  const handleDeleteButtonClick = (id: number) => {
    deleteMutation.mutate(id); // Pass the ID to the delete function
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
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? 'Adding...' : 'Add Member'}
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
