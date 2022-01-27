
import React from 'react';
import { List,
    Datagrid,
    TextField,
    Create,
    SimpleForm,
    TextInput,
    Edit,
    NumberField,
    ReferenceField,
    NumberInput,
} from 'react-admin';


export const GradesList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="type"/>
            <ReferenceField reference="students" source="student_id">
                <TextField source="name"/>
            </ReferenceField>
            <NumberField source="grade"/>
            <NumberField source="max"/>
        </Datagrid>
    </List>
);

export const GradesEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextField source="id"/>
            <TextInput source="type"/>
            <ReferenceField reference="students" source="student_id">
                <TextField source="name"/>
            </ReferenceField>
            <NumberInput source="max"/>
            <NumberInput source="grade" />
        </SimpleForm>
    </Edit>
);

export const GradesCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="student_id"/>
            <TextInput source="type"/>
            <NumberInput source="max"/>
            <NumberInput source="grade"/>
        </SimpleForm>
    </Create>
);