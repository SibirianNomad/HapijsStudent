import { Plugin, Server } from '@hapi/hapi'
import { getStudents, getStudent, editStudent, getAverageFaculty, getMinMaxAverageGrade } from './routes'

export const Students: Plugin<object> = {
  name: 'students',
  version: '1',
  register: async (server: Server) => {
    server.route([getStudents, getStudent, editStudent, getAverageFaculty, getMinMaxAverageGrade])
  }
}
