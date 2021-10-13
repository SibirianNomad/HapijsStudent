import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'

import { AverageDto, AverageMinMaxDto, UpdateStudentDto } from './../../schemes'

export const getStudents = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { faculty } = request.query as AverageDto

  const { getStudents } = request.server.methods

  const students = await getStudents(faculty)

  if (students !== null) {
    return reply.response(students).code(200)
  }

  return reply.response().code(404)
}

export const getStudent = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const id = request.params.id

  const { getStudent } = request.server.methods

  const student = await getStudent(id)

  if (student !== null) {
    return reply.response(student).code(200)
  }

  return reply.response().code(404)
}

export const getAverageFaculty = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { faculty } = request.query as AverageDto

  const { getAverageFaculty } = request.server.methods

  const averageFaculty = await getAverageFaculty(faculty)

  if (averageFaculty !== null) {
    return reply.response(averageFaculty).code(200)
  }

  // return reply.response().code(404)

  return reply.response({ ok: false, error: 'invalid query parameters' }).code(401)
}

export const getMinMaxAverageGrade = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { faculty, sex } = request.payload as AverageMinMaxDto

  const { getMinMaxAverageGrade } = request.server.methods

  const MinMaxAverageGrade = await getMinMaxAverageGrade(faculty, sex)

  return reply.response(MinMaxAverageGrade).code(200)
}

export const editStudent = async (request: Request, reply: ResponseToolkit): Promise<ResponseObject> => {
  const { firstName, lastName, sex, phone, faculty, averageGrade } = request.payload as UpdateStudentDto
  const id = request.params.id

  const { editStudent } = request.server.methods

  const result = await editStudent(id,
    {
      firstName,
      lastName,
      sex,
      phone,
      faculty,
      averageGrade
    })

  return reply.response(result).code(200)
}
