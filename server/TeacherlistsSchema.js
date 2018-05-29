fetch = require("isomorphic-fetch")
graphql = require('graphql')

function CreateTeacherlistsSchema(config){
  const BASE_URL = 'https://api.teacherlists.com/v3/';

  function fetchResponseByURL(relativeURL, query='') {
    return fetch(`${BASE_URL}${relativeURL}?app_id=${config.teacherlists.app_id}&app_key=${config.teacherlists.app_key}${query}`).then(res => res.json());
  }

  function fetchAll(relativeURL, query=''){
    return fetchResponseByURL(relativeURL, query).then(res => res.subset)
  }

  function fetchCount(relativeURL, query=''){
    return fetchResponseByURL(relativeURL, query).then(res => res.total)
  }

  const GradeLevelType = new graphql.GraphQLObjectType({
    name: 'GradeLevel',
    description: 'Class details',
    fields: () => ({
      grade: {
        type: graphql.GraphQLString,
        resolve: record => record.grade_name
      }
    }),
  });

  const ClassroomType = new graphql.GraphQLObjectType({
    name: 'Classroom',
    description: 'Class details',
    fields: () => ({
      name: {
        type: graphql.GraphQLString,
        resolve: record => record.class_name
      },
      grade_levels: {
        type: new graphql.GraphQLList(GradeLevelType),
        resolve: record => fetchAll('GradeLevel', `&classrooms_id=${record.id}`)
      }
    }),
  });

  const SchoolType = new graphql.GraphQLObjectType({
    name: 'School',
    description: 'school record',
    fields: () => ({
      id: {
        type: graphql.GraphQLString,
        resolve: school => school.id
      },
      name: {
        type: graphql.GraphQLString,
        resolve: school => school.School_Name
      }
    }),
  });

  const ItemType = new graphql.GraphQLObjectType({
    name: 'Item',
    description: 'Item info',
    fields: () => ({
      name: {
        type: graphql.GraphQLString,
        resolve: record => record.item_name
      },
      brand: {
        type: graphql.GraphQLString,
        resolve: record => record.brand_id?fetchResponseByURL(`Brand/${record.brand_id}`).then(rec => rec.brand_name):null
      },
      upc1: {
        type: graphql.GraphQLString,
        resolve: record => record.upc1
      },
      upc1_qty: {
        type: graphql.GraphQLString,
        resolve: record => record.upc1_qty
      },
      upc2: {
        type: graphql.GraphQLString,
        resolve: record => record.upc2
      },
      upc2_qty: {
        type: graphql.GraphQLString,
        resolve: record => record.upc2_qty
      },
      upc3: {
        type: graphql.GraphQLString,
        resolve: record => record.upc3
      },
      upc3_qty: {
        type: graphql.GraphQLString,
        resolve: record => record.upc3_qty
      },
      item_qty_desc: {
        type: graphql.GraphQLString,
        resolve: record => record.item_qty_desc
      },
      orderable: {
        type: graphql.GraphQLString,
        resolve: record => record.orderable
      },
    }),
  });

  const ListDetailType = new graphql.GraphQLObjectType({
    name: 'ListDetail',
    description: 'list details',
    fields: () => ({
      item:{
        type: ItemType,
        resolve: record => fetchResponseByURL(`Item/${record.item_id}`)
      },
      qty: {
        type: graphql.GraphQLString,
        resolve: record => record.quantity
      },
    }),
  });

  const ListType = new graphql.GraphQLObjectType({
    name: 'List',
    description: 'Returns a list',
    fields: () => ({
      id: {
        type: graphql.GraphQLString,
        resolve: list => list.id
      },
      list_name: {
        type: graphql.GraphQLString,
        resolve: list => list.list_name
      },
      school_year: {
        type: SchoolType,
        resolve: record => record.school_year
      },
      school: {
        type: SchoolType,
        resolve: record => fetchResponseByURL(`School/${record.school_id}`)
      },
      item_count: {
        type: graphql.GraphQLInt,
        resolve: record => fetchCount(`ListDetail`, `&list_header_id=${record.id}`)
      },
      list_details: {
        type: new graphql.GraphQLList(ListDetailType),
        resolve: record => fetchAll(`ListDetail`, `&list_header_id=${record.id}`)
      },
      classroom: {
        type: ClassroomType,
        resolve: record => fetchResponseByURL(`Classroom/${record.classroom_id}`)
      },
      modified: {
        type: graphql.GraphQLString,
        resolve: record => record.modified
      },
      description: {
        type: graphql.GraphQLString,
        resolve: record => record.description
      }
    }),
  });

  const QueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    description: 'Returns a list',
    fields: () => ({
      list: {
        type: ListType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, {id}) => fetchResponseByURL(`ListHeader/${id}`)
      },
      school_lists: {
        type: new graphql.GraphQLList(ListType),
        args:{
          school_id: { type: graphql.GraphQLString }
        },
        resolve: (_, {school_id}) => fetchAll(`ListHeader`, `&School_ID=${school_id}`)
      }
    }),
  });

  return new graphql.GraphQLSchema({
    query: QueryType
  });
}


module.exports =  CreateTeacherlistsSchema;