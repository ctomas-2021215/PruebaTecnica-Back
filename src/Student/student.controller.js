'use strict'
 const Student  = require('./student.model')    

 exports.createStudent = async (req, res) => {
    try {
      const studentData = req.body;
  
      // Validaciones
      if (!isValidCarnet(studentData.carnet)) {
        return res.status(400).json({ message: 'Carnet no valido ' });
      }
  
      if (!isValidGenre(studentData.generoPoe)) {
        return res.status(400).json({ message: 'Género de poesía inválido' });
      }
  
      // Agregar la fecha de inscripción automática
      studentData.fechaIns = new Date();
  
      // Determinar la fecha de concurso según las reglas
      const lastChar = studentData.carnet[studentData.carnet.length - 1];
      const lowerCaseGenre = studentData.generoPoe.toLowerCase();
  
      if (lastChar === '1' && lowerCaseGenre === 'dramatica') {
        // Concurso 5 días después de la inscripción, excluyendo sábados y domingos
        studentData.fechaConcurso = calculateConcursoDate(studentData.fechaIns, 5);
      } else if (lastChar === '3' && lowerCaseGenre === 'epica') {
        // Concurso en el último día del mes de inscripción, excluyendo sábados y domingos
        studentData.fechaConcurso = getLastDayOfMonth(studentData.fechaIns);
      } else {
        // Para otras terminaciones de carnets y géneros, el concurso es el próximo viernes
        studentData.fechaConcurso = getNextFriday(studentData.fechaIns);
      }
  
      // Crea el estudiante en la base de datos
      const newStudent = await Student.create(studentData);
  
      res.status(201).json({ message: 'Estudiante creado exitosamente', student: newStudent });
      } catch (error) {
      res.status(500).json({ message: 'Error al crear estudiante', error: error.message });
    }
  };
  
  // Función para calcular la fecha de concurso excluyendo sábados y domingos
  function calculateConcursoDate(startDate, daysToAdd) {
    const oneDay = 24 * 60 * 60 * 1000;
    let concursoDate = new Date(startDate.getTime() + daysToAdd * oneDay);
  
    // Si la fecha cae en sábado o domingo, avanzamos al siguiente día hábil
    while (concursoDate.getDay() === 0 || concursoDate.getDay() === 6) {
      concursoDate = new Date(concursoDate.getTime() + oneDay);
    }
  
    return concursoDate;
  }
  
  // Función para obtener el último día del mes
  function getLastDayOfMonth(date) {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(0);
    return calculateConcursoDate(nextMonth, 0);
  }
  
  // Función para obtener el próximo viernes
  function getNextFriday(date) {
    const daysUntilFriday = (5 - date.getDay() + 7) % 7;
    return calculateConcursoDate(date, daysUntilFriday);
  }
  
 

    // Función para validar el carnet
    function isValidCarnet(carnet) {
        if (carnet.length !== 6) {
            return false;
        }
        if (carnet.includes('0')) {
            return false;
        }
        if (carnet[0] !== 'A') {
            return false;
        }
        if (carnet[2] !== '5') {
            return false;
        }
        const lastChar = carnet[carnet.length - 1];
        if (!['1', '3', '9'].includes(lastChar)) {
            return false;
        }
        return true; 
    }


    // Función para validar el género de poesía
    function isValidGenre(genre) {
        const allowedGenres = ['lirica', 'epica', 'dramatica'];
        return allowedGenres.includes(genre.toLowerCase());
    }


    //get Student
    exports.getAllStudents = async (req, res) => {
        try {
            const students = await Student.find();
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener estudiantes', error: error.message });
        }
    };
