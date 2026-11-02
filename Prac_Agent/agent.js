import emails from './emails'

async function Agent (question){
    const apiKey = process.env.API_KEY
    if(!apiKey){
        return ('Please add a api key in the env file first')
    }

    const response = await fetch (`${process.env.Base_URL}`,{
       method:"POST", 
       headers:{
        "Content-Type":"application/json",
        "Authorization": `Bearer ${apiKey}`
       }, 
       body:JSON.stringify({
        model:"claude-sonnet-5.5",
        messages:[
            {
                role:"system",
                content:"Hi This is Tejas Nahar"
            },
            {
                role:"user",
                content:question
            }
        ]
       })
    })
    if(!response.ok){
        return (`${response.status} ${response.statusText}`)
    }
    const answer = await response.json()
    return answer.choices[0].message.content
}

const testing = await Agent(`${JSON.stringify(emails)} These are the emails received by the company the requirements are `)
