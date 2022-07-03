enum Job{
    developer = "Developer",
    teacher = "Teacher",
    singer = "Singer",
    actress = "Actress",
    actor = "Actor"    
}

enum Subjects{
    DiscretMath = "Discret Math",
    Algorithms = "Algorithms",
    Calculus = "Calculus",
    OOP = "OOP (Object Oriented Programming)"
}

interface Person{
    name:string,
    age: number,
    job?: Job
}

interface Student extends Person{
    registration: string,
    subjects: Subjects[]
}


const maria:Person = {
    name:"Maria",
    age: 23,
    job: Job.developer
}

const john:Person = {
    name:"John",
    age: 41,
    job: Job.actor
}

const jessi:Student = {
    name:"Jessica",
    age: 20,
    registration: "2555SDF",
    subjects: [Subjects.Calculus, Subjects.OOP]
}


function listItems(list: Subjects[]){
    for(const element of list){
        console.log(element);
    }
}

listItems(jessi.subjects);
