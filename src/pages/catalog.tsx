import { Page, Navbar, List, ListItem, Block, Button, Input } from 'framework7-react';
import { useState, ChangeEvent } from 'react';
import { useSaveFamily,useFamilies } from '../lib/API/family-api'; // Use the combined file


const Family = () => {
  const [newMember, setNewMember] = useState<string>('');

  const { data: families = [], refetch, isError } = useFamilies();

  const mutation = useSaveFamily({
    mutationConfig: {
      onSuccess: () => {
        setNewMember('');
      },
      onError: (error: Error) => {
        console.error('Error creating family:', error);
        // Handle error appropriately (e.g., show notification)
      },
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember(e.target.value);
  };

  const handleButtonClick = () => {
    if (newMember.trim() !== '') {
      mutation.mutate(newMember);
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
          onClick={handleButtonClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Member'}
        </Button>
      </Block>
      <List strong dividersIos outlineIos insetMd>
        {families.length >0 && families.map((member, index) => (
          <ListItem key={index} title={member.familyName} />
        ))}
      </List>
    </Page>
  );
};

export default Family;
