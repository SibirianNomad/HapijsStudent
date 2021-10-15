import { Plugin, Server } from '@hapi/hapi'
import { getStudents, getStudent, getAverageFaculty, getMinMaxAverageGrade, editStudent } from './routes'

export const Students: Plugin<object> = {
  name: 'students',
  version: '1',
  register: async (server: Server) => {
    server.route([getStudents, getStudent, getAverageFaculty, getMinMaxAverageGrade, editStudent])
  }
}
