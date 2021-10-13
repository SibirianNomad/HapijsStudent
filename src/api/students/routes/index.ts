import { ServerRoute } from '@hapi/hapi'
import * as students from './handlers/students'
import { responseFilter } from '../../responseFilter'
import { MinMaxAverageSchema } from '../schemes'

export const getStudents:ServerRoute = {
  method: 'GET',
  path: '/students',
  handler: students.getStudents,
  options: {
    id: 'students',
    tags: ['api', 'students'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    }
  }
}

export const getStudent: ServerRoute = {
  method: 'GET',
  path: '/students/{id}',
  handler: students.getStudent,
  options: {
    id: 'student',
    tags: ['api', 'students'],
    validate: {
      failAction: ('error')
    },
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    }
  }
}

export const editStudent: ServerRoute = {
  method: 'PUT',
  path: '/students/{id}',
  handler: students.editStudent,
  options: {
    id: 'studentEdit',
    tags: ['api', 'students'],
    validate: {
      failAction: ('error')
    },
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    }
  }
}

export const getAverageFaculty: ServerRoute = {
  method: 'GET',
  path: '/average',
  handler: students.getAverageFaculty,
  options: {
    id: 'averageFaculty',
    tags: ['api', 'faculty'],
    validate: {
      failAction: ('error')
    },
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    }
  }
}

export const getMinMaxAverageGrade: ServerRoute = {
  method: 'POST',
  path: '/average/faculty/min-max',
  handler: students.getMinMaxAverageGrade,
  options: {
    id: 'averageFacultyMinMax',
    tags: ['api', 'faculty'],
    validate: {
      failAction: async (request, h, err) => { return err },
      payload: MinMaxAverageSchema()
    },

    ext: {
      onPreResponse: ({
        method: responseFilter
      })
    }
  }
}
