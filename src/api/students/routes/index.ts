import { ServerRoute } from '@hapi/hapi'
import * as students from './handlers/students'
import { responseFilter } from '../../responseFilter'
import { MinMaxAverageSchema, StudentSchema } from '../schemes'
import * as Joi from 'joi'

export const getStudents:ServerRoute = {
  method: 'GET',
  path: '/students',
  handler: students.getStudents,
  options: {
    id: 'students',
    notes: 'Get all student or all students of faculty',
    tags: ['api', 'students'],
    ext: {
      onPreResponse: {
        method: responseFilter
      }
    },
    validate: {
      failAction: ('error'),
      query: Joi.object({
        facultyId: Joi.string().uuid()
      })
    }
  }
}

export const getStudent: ServerRoute = {
  method: 'GET',
  path: '/students/{id}',
  handler: students.getStudent,
  options: {
    id: 'student',
    notes: 'Get student by id',
    tags: ['api', 'students'],
    validate: {
      failAction: ('error'),
      params: StudentSchema
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
    notes: 'Update data of student by id',
    tags: ['api', 'students'],
    validate: {
      failAction: ('error'),
      params: StudentSchema
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
    notes: 'Get average grade of faculty',
    tags: ['api', 'faculty'],
    validate: {
      failAction: ('error'),
      query: Joi.object({
        facultyId: Joi.string().uuid()
      })
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
    notes: 'Get min and max average grade by faculty id and sex',
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
