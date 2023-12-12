# Quiz app
## Launch

Install packages
`npm install`

Run database on  docker
`docker compose up`

Run application
`nest start`

GraphQL is on `http://localhost:3000/graphql`

## Example

### Add quiz
```graphql
mutation {
    addQuiz(input: { name: "Math test" , questions: [
        { task: "2+2", correctAnswer: "4" }
        { task: "2+2*2", answers: ["6", "8"], correctAnswer: "6" }
        { task: "sort numbers", correctAnswers: ["-1", "0", "1"] }
        {
            task: "find irrational numbers"
            answers: ["-1", "1/2", "2", "e", "pi"]
            correctAnswers: ["e", "pi"]
        }
    ] }) {
        id
        name
        questions {
            id
            task
            ... on PlainTextAnswer {
                correctAnswer
            }
            ... on SingleCorrectAnswer {
                answers
                correctAnswer
            }
            ... on Sorting {
                correctAnswers
            }
            ... on MultipleCorrectAnswers {
                answers
                correctAnswers
            }
        }
    }
}

```
```json
{
  "data": {
    "addQuiz": {
      "id": 1,
      "name": "Math test",
      "questions": [
        {
          "id": 1,
          "task": "2+2",
          "correctAnswer": "4"
        },
        {
          "id": 2,
          "task": "2+2*2",
          "answers": [
            "6",
            "8"
          ],
          "correctAnswer": "6"
        },
        {
          "id": 3,
          "task": "sort numbers",
          "correctAnswers": [
            "-1",
            "0",
            "1"
          ]
        },
        {
          "id": 4,
          "task": "find irrational numbers",
          "answers": [
            "-1",
            "1/2",
            "2",
            "e",
            "pi"
          ],
          "correctAnswers": [
            "e",
            "pi"
          ]
        }
      ]
    }
  }
}
```
### Get all quizzes
```graphql
{
    quizzes {
        id
        name
        questions {
            id
            task
            ... on PlainTextAnswer {
                correctAnswer
            }
            ... on SingleCorrectAnswer {
                answers
                correctAnswer
            }
            ... on Sorting {
                correctAnswers
            }
            ... on MultipleCorrectAnswers {
                answers
                correctAnswers
            }
        }
    }
}
```
```json
{
  "data": {
    "quizzes": [
      {
        "id": 1,
        "name": "Math test",
        "questions": [
          {
            "id": 1,
            "task": "2+2",
            "correctAnswer": "4"
          },
          {
            "id": 2,
            "task": "2+2*2",
            "answers": [
              "6",
              "8"
            ],
            "correctAnswer": "6"
          },
          {
            "id": 3,
            "task": "sort numbers",
            "correctAnswers": [
              "-1",
              "0",
              "1"
            ]
          },
          {
            "id": 4,
            "task": "find irrational numbers",
            "answers": [
              "-1",
              "1/2",
              "2",
              "e",
              "pi"
            ],
            "correctAnswers": [
              "e",
              "pi"
            ]
          }
        ]
      }
    ]
  }
}
```
### Get quiz by student
```graphql
{
   quizStudent(id:1){
    id
    name
     questions{
       id
       task
       ... on PlainTextAnswerStudent{
         type
       }
       ... on SingleCorrectAnswerStudent{
        type
         answers
       }
       ... on SortingStudent{
        type
         answers
       }
      ... on MultipleCorrectAnswersStudent{
        type
        answers
      }
     }
   }
}
```
```json
{
  "data": {
    "quizStudent": {
      "id": 1,
      "name": "Math test",
      "questions": [
        {
          "id": 1,
          "task": "2+2",
          "type": "Plain Text Answer"
        },
        {
          "id": 2,
          "task": "2+2*2",
          "type": "Single Correct Answer",
          "answers": [
            "6",
            "8"
          ]
        },
        {
          "id": 3,
          "task": "sort numbers",
          "type": "Sorting",
          "answers": [
            "0",
            "1",
            "-1"
          ]
        },
        {
          "id": 4,
          "task": "find irrational numbers",
          "type": "Multiple Correct Answers",
          "answers": [
            "1/2",
            "pi",
            "-1",
            "2",
            "e"
          ]
        }
      ]
    }
  }
}
```

### Solve quiz
```graphql
{
    answer(
        id: 1
        quiz: {
            id: 1
            questions: [
                { id: 4, answers: ["e", "pi", "-1"]}
                { id: 2, answer: "6" }
                { id: 1, answer: "4" }
            ]
        }
    ) {
        id
        name
        answered
        questionsNumber
        correct
        questions {
            id
            task
            correct
            ... on PlainTextAnswerStudentCheck {
                studentAnswer
                correctAnswer
            }
            ... on SingleCorrectAnswerStudentCheck {
                studentAnswer
                answers
                correctAnswer
            }
            ... on SortingStudentCheck {
                studentAnswers
                correctAnswers
            }
            ... on MultipleCorrectAnswersStudentCheck {
                answers
                studentAnswers
                correctAnswers
            }
        }
    }
}

```
```json
{
  "data": {
    "answer": {
      "id": 1,
      "name": "Math test",
      "answered": 3,
      "questionsNumber": 4,
      "correct": 2,
      "questions": [
        {
          "id": 1,
          "task": "2+2",
          "correct": true,
          "studentAnswer": "4",
          "correctAnswer": "4"
        },
        {
          "id": 2,
          "task": "2+2*2",
          "correct": true,
          "studentAnswer": "6",
          "answers": [
            "6",
            "8"
          ],
          "correctAnswer": "6"
        },
        {
          "id": 4,
          "task": "find irrational numbers",
          "correct": false,
          "answers": [
            "-1",
            "1/2",
            "2",
            "e",
            "pi"
          ],
          "studentAnswers": [
            "-1",
            "e",
            "pi"
          ],
          "correctAnswers": [
            "e",
            "pi"
          ]
        }
      ]
    }
  }
}
```
