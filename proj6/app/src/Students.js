
import * as React from 'react'; 
import { List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    Edit,
    Show,
    SimpleShowLayout,
} from 'react-admin';
import GradesTable from './GradesTable'

export const StudentsList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="name"/>
        </Datagrid>
    </List>
);

export const StudentsCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id"/>
            <TextInput source="name"/>
        </SimpleForm>
    </Create>
);

export const StudentsEdit = props => (
    <Edit {...props}>
        <SimpleForm> 
            <TextField source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const StudentsShow = props => (
    <Show {...props}>
		<SimpleShowLayout>
			<TextField source="id" />
			<TextField source="name" />
			<GradesTable {...props} />
		</SimpleShowLayout>
	</Show>
);