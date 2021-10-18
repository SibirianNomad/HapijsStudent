import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { AverageDto, AverageMinMaxDto, UpdateStudentDto } from './../../schemes'

export const getStudents = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { facultyId } = request.query as AverageDto

  const { getStudents } = request.server.methods

  const students = await getStudents(facultyId)

  if (Object.keys(students).length) {
    return reply.response(students).code(200)
  }

  return reply.response('Faculty not found').code(404)
}

export const getStudent = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const id = request.params.id

  const { getStudent } = request.server.methods

  const student = await getStudent(id)

  if (student !== null) {
    return reply.response(student).code(200)
  }

  return reply.response('Student not found').code(404)
}

export const getAverageFaculty = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { facultyId } = request.query as AverageDto

  const { getAverageFaculty } = request.server.methods

  const averageFaculty = await getAverageFaculty(facultyId)

  if (averageFaculty !== null) {
    return reply.response(averageFaculty).code(200)
  }

  return reply.response({ ok: false, error: 'invalid query parameters' }).code(401)
}

export const getMinMaxAverageGrade = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { facultyId, sex } = request.payload as AverageMinMaxDto

  const { getFaculty } = request.server.methods

  const faculty = await getFaculty(facultyId)

  if (!faculty) {
    return reply.response('Faculty not found').code(404)
  }

  const { getMinMaxAverageGrade } = request.server.methods

  const MinMaxAverageGrade = await getMinMaxAverageGrade(facultyId, sex, faculty)

  return reply.response(MinMaxAverageGrade).code(200)
}

export const editStudent = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { firstName, lastName, sex, phone, facultyId, averageGrade } = request.payload as UpdateStudentDto
  const id = request.params.id

  const { editStudent, getStudent } = request.server.methods

  const student = await getStudent(id)

  if (!student) {
    return reply.response('Student not found').code(404)
  }
  const result = await editStudent(id,
    {
      firstName,
      lastName,
      sex,
      phone,
      facultyId,
      averageGrade
    })

  return reply.response(result).code(200)
}
