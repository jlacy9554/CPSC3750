
import * as React from "react";
import { fetchUtils, Admin, Resource } from 'react-admin';
import {StudentsList,StudentsShow,StudentsEdit,StudentsCreate} from './Students.js';
import {GradesList, GradesEdit, GradesCreate} from './Grades';
import MyRestClient from "./RestClient.js";

const httpClient = (url, options = {}) => {
  if(!options.headers){
    options.headers = new Headers({ Authorization: `Basic ${btoa("teacher:testing")}` });
  }
  else{
    options.headers.set('Authorization', `Basic ${btoa("teacher:testing")}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = MyRestClient('../project5/', httpClient);
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="students" list={StudentsList} create={StudentsCreate} show={StudentsShow} edit={StudentsEdit}/>
    <Resource name="grades" list={GradesList} create={GradesCreate} edit={GradesEdit}/>
  </Admin>
)


export default App;
