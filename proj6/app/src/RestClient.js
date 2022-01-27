import RestClient from 'ra-data-json-server';

const MyRestClient = (apiUrl, httpClient) =>{
    const client = RestClient(apiUrl, httpClient)
    return {
        getList: (resource, params) => {
            console.log('calling getList')
            console.log(params)
            return client.getList(resource, params)
        },
        getOne: (resource, params) => {
            console.log('calling getone', resource, params)
            
            if (resource ==='students'){
                return client.getOne(resource, params)
                    .then((record) => {
                        console.log(record)
                        const student_id = record.data.id
                        const gradesParams = {
                            filter: {student_id},
                            sort:{field: "id", order:"ASC"},
                            pagination:{page: 1, perPage: 1000}
                        }

                        return client.getList('grades', gradesParams)
                        .then((grades)=>{
                            record.data.grades = grades.data
                            console.log('new record', record)
                            return record
                        })
                    })
            }
            else{
                return client.getOne(resource, params)
            }
        },
        getMany: (resource, params) => {
            console.log('calling getmany')
            const promises = [];
            const records = [];
            for( let i =0; i< params.ids.length;i++){
                const id = params.ids[i]
                promises.push(
                    client.getOne(resource,{id})
                    .then((response) => {
                         records.push(response.data)
                    })
                )
            }
            return Promise.all(promises).then(() =>({data:records}))
            //return client.getMany(resource, params)
        },
        getManyReference: (resource, params) =>{
            console.log('calling getmanyreference')
            return client.getManyReference(resource, params)
        },
        update: (resource, params) =>{
            console.log('calling update')
            return client.update(resource, params)
        },
        updateMany: (resource, params) =>{
            console.log('calling updatemany')
            return client.updateMany(resource, params)
        },
        create: (resource, params) =>{
            console.log('calling create')
            return client.create(resource, params)
        },
        delete: (resource, params) =>{
            console.log('calling delete')
            return client.delete(resource, params)
        },
        deleteMany: (resource, params) =>{
            console.log('calling deletemany')
            return client.deleteMany(resource, params)
        }
    }
}

export default  MyRestClient;