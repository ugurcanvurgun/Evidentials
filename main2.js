// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/
//Updated 10/31/2021

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "intro", "trainInstr", "training", "prodInstr", "production", "compInstr", "comprehension", "end1", "end2", "demoIntro", "demographics", "language", SendResults() , "bye" )
//Sequence( "intro", "training", "production", "comprehension", "end", "demoIntro", "demographics", "language", SendResults() , "bye" )
//Sequence("demographics", "language", SendResults() , "bye" )

newTrial( "intro" ,    
    newImage("consent", "consent.jpg") 
            .size(750,1000)   
        ,
        newCanvas("canvas1", 750,1100)
            .center()
            .add( 0,0 , getImage("consent") )
            .add("center at 50%", 1000, newButton("consent", "I agree to participate in this study"))
            .print()
        ,
    getButton("consent")
        .wait()
    ,
    clear()
    ,
    newText("<p style=font-size:18px;>Welcome to our study!</p>" +
            "<p style=font-size:18px;>Please copy your MTurk Worker ID below then press Enter to go full screen and begin!:</p>")
        .center()
        .print()
    ,
    newTextInput("inputID")
        .center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set(getTextInput("inputID"))
    ,
    fullscreen()
).setOption("hideProgressBar",true)
.log("ID", getVar("ID")
)

// Training Instructions
Template( "trainInstr.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "trainInstr" ,

        newImage("picture", "https:" + row.Picture)
            .size(750,562)
        ,
        newCanvas("canvas", 750,562)
            .center()
            .add( 0,0 , getImage("picture") )
            .print()
        ,
        newTimer("wait0", 12000)
            .start()
            .wait()
        ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID"))
)
// Training
Template( "training.csv" ,
    row => newTrial( "training" ,

    newTimer("preTrial", 250)
            .start()
            .wait()
,
    newImage("speaker", row.SpeakerImage)   
        .size(700, 395)
,   
    newImage("symbol", "https:" + row.Symbol)
        .size(400,110)
,
    newText("phrase","<p style=font-size:22px;>"+row.Phrase+"</p>")
, 
    newImage("EventImage1", "https:" + row.EventImage1)
            .size(700, 395)
            
,   newImage("EventImage2", "https:" + row.EventImage2)
            .size(700, 395)
            
,   newImage("EventImage3", "https:" + row.EventImage3)
            .size(700, 395)     
,
    newCanvas('trainvid', 700,495)
        .center()
        .add(3,0, getImage("EventImage1"))
        .print()
,
        newTimer("wait1", 4000).start().wait()
        .remove(getImage("EventImage1"))
,
    getCanvas('trainvid')
        .add(3,0, getImage("EventImage2"))
        .print()
,
        newTimer("wait2", 4000).start().wait()
        .remove(getImage("EventImage2"))
,
    getCanvas('trainvid')
        .add(3,0, getImage("EventImage3"))     
        .print()
,
        newTimer("wait3", 10).start().wait()
        .remove(getImage("EventImage3"))               
,
    getCanvas('trainvid') 
        .add(3, 0, getImage("EventImage3"))         
        .add(275,360, getImage("symbol"))
        .add(300, 405, getText("phrase"))
        .print()              
,
        newTimer("wait4", 7000)
            .start()         
            .wait()

).setOption("hideProgressBar",true)
    .log("ID", getVar("ID")) 
    .log("EventID", row.Event)
    .log("Access", row.Access)
    .log("Marker", row.Marker)      
    .log("List",row.List)
)
// Production Instructions
Template( "prodInstr.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "prodInstr" ,

    newTimer("preTrial", 500)
            .start()
            .wait()
,
        newImage("picture", "https:" + row.Picture)
            .size(750,562)
,
        newCanvas("canvas", 750,562)
            .center()
            .add( 0,0 , getImage("picture") )
            .print()
        ,
        newTimer("wait5", row.Timer)
            .start()
            .wait()
        ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID"))  
)
// Production
Template( "production.csv" ,
    row => newTrial( "production" ,
    
    newTimer("preTrial", 250)
            .start()
            .wait()
,
    newImage("speaker2", row.SpeakerImage)
        .size(700, 395)      
,
    newImage("symbol", "https:" + row.Symbol)
        .size(400,110)
,
    newText("phrase","<p style=font-size:20px;>"+row.Phrase+"</p>")
,
    newImage("EventImage4", "https:" + row.EventImage1)
            .size(700, 395)
            
,   newImage("EventImage5", "https:" + row.EventImage2)
            .size(700, 395)
            
,   newImage("EventImage6", "https:" + row.EventImage3)
            .size(700, 395)
,
   newCanvas('prodvid', 700,495)
        .center()
        .add(3,0, getImage("EventImage4"))
        .print()
,
        newTimer("wait4", 4000).start().wait()
        .remove(getImage("EventImage4"))
,
    getCanvas('prodvid')
        .add(3,0, getImage("EventImage5"))
        .print()
,
        newTimer("wait6", 4000).start().wait()
        .remove(getImage("EventImage5"))
,
    getCanvas('prodvid')
        .add(3,0, getImage("EventImage6"))
        .print()       
,
        newTimer("wait7", 10).start().wait()
        .remove(getImage("EventImage6"))       
,
    getCanvas('prodvid') 
        .add(3, 0, getImage("EventImage6"))    
        .add(275,360, getImage("symbol"))
        .add(300, 405, getText("phrase"))
        .print()              
,
        newTimer("wait8", 7000)
            .start()         
            .wait()
,            
    newText("<p style=font-size:18px;>For each clip please type in the textbox provided \
    <strong>either</strong> <u>the verb and the verb marker</u> or <u>only the verb</u> as needed \
    in order to complete the speech bubble.</p>")
        .center()
        .print()
,
    newTextInput("productionResp")
        .settings.log()    
        .center()
        .print()
,
    newVar("prodResp")
        .global()
        .set(getTextInput("productionResp"))     
,
    newTimer("wait", 10000)
            .start()
            .wait()
,
        newButton("nextProd",">>")
            .center()
            .print()
            .wait()
,
        getButton("nextProd")
            .remove()
,
    getTextInput("productionResp")
        .test.text(/[^\s]/)
            .success()
            .failure(newText("TimedOut", "Please type your answer in the field above, then press ENTER").color("red").bold().print()
                            .log()
                    ,
                    getTextInput("productionResp")
                      .wait( 
        // Using a regular expression here: at least one non-empty character
                        getTextInput("productionResp").test.text(/[^\s]/)
                        )
                        ,
                        getVar("prodResp")
                            .set(getTextInput("productionResp"))
                        ,
                    getText("TimedOut").remove())

).setOption("hideProgressBar",true)
    .log("ID", getVar("ID")) 
    .log("EventID", row.Event)
    .log("Access", row.Access)
    .log("Marker", row.Marker)
    .log("CorrectAnswer", row.Correct)
    .log("List",row.List)
)
// Comprehension Instructions
Template( "compInstr.csv" ,
    // Row will iteratively point to every row in myTable.csv
    row => newTrial( "compInstr" ,

            newTimer("preTrial", 250)
            .start()
            .wait()
,
        newImage("picture", "https:" + row.Picture)
            .size(750,562)
        ,
        newCanvas("canvas", 750,562)
            .center()
            .add( 0,0 , getImage("picture") )
            .print()
        ,
        newTimer("wait9", row.Timer)
            .start()
            .wait()
        ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID"))       
)
// Comprehension
Template( "comprehension.csv" ,
    row => newTrial( "comprehension"
,
    newTimer("preTrial", 250)
            .start()
            .wait()
,
    newImage("speaker3", row.SpeakerImage)
        .size(700, 395)
,       
    newImage("symbol", "https:" + row.Symbol)
        .size(400,110)  
,
    newText("phrase","<p style=font-size:22px;>"+row.Phrase+"</p>")
,              
    newImage("EventImage7", "https:" + row.EventImage1)
            .size(700, 395)
                   
,   newImage("EventImage8", "https:" + row.EventImage2)
            .size(700, 395)
            
,   newImage("EventImage9", "https:" + row.EventImage3)
            .size(700, 395)
,
   newCanvas('compvid', 700,495)
        .center()
        .add(3,0, getImage("EventImage7"))
        .print()
,
        newTimer("wait4", 4000).start().wait()
        .remove(getImage("EventImage7"))
,
    getCanvas('compvid')
        .add(3,0, getImage("EventImage8"))
        .print()
,
        newTimer("wait6", 4000).start().wait()
        .remove(getImage("EventImage8"))
,
    getCanvas('compvid')
        .add(3,0, getImage("EventImage9"))
        .print()       
,
        newTimer("wait7", 10).start().wait()
        .remove(getImage("EventImage9"))          
,
    getCanvas('compvid')
        .add(3, 0, getImage("EventImage9"))   
        .add(275,360, getImage("symbol"))
        .add(300, 405, getText("phrase"))
        .print()      
,
    newText("<p style=font-size:18px;>Was <strong>ga</strong> used correctly? Please respond either <strong>Yes</strong> or <strong>No</strong> below.</p>")
        .center()
        .print()
,
    newTextInput("comprehensionResp")
        .settings.log() 
        .center()
        .print()    
,
    newVar("compResp")
        .global()
        .set(getTextInput("comprehensionResp"))
       
,
        newTimer("wait", 8000)
            .start()
            .wait()
,
        newButton("nextComp",">>")
            .center()
            .print()
            .wait()
,
        getButton("nextComp")
            .remove()
,
        getTextInput("comprehensionResp")
        .test.text(/[^\s]/)
            .success()
            .failure(newText("TimedOut", "Please type your answer in the field above, then press ENTER").color("red").bold().print()
                            .log()
                    ,
                    getTextInput("comprehensionResp")
                      .wait( 
        // Using a regular expression here: at least one non-empty character
                        getTextInput("comprehensionResp").test.text(/[^\s]/) 
                        )
                        ,
                        getVar("compResp")
                            .set(getTextInput("comprehensionResp"))
                        ,
                    getText("TimedOut").remove())

    ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID")) 
    .log("EventID", row.Event)
    .log("Access", row.Access)
    .log("CorrectAnswer", row.Correct)
    .log("Marker", row.Marker)
    .log("List",row.List)
)
newTrial( "end1" ,
    newText("<p style=font-size:18px;>What do you think the marker <strong>'ga'</strong> means and when is it used?</p>")
        .center()
        .print()
    ,

newTextInput("FinalResp")
    .settings.log()
    .settings.lines(0)
    .settings.size(300, 50)
    .center()
    .print()
,
newButton("send", "Send")
    .center()
    .print()
    .wait(getTextInput("FinalResp").test.text(/[^\s]/)
            .success()
            .failure(newText("TimedOut", "Please type your answer in the field above, then press SEND").color("red").bold().print()
                            .log()
                    )
    )
,
    newVar("FinalResp")
        .global()
        .set(getTextInput("FinalResp"))
        
).setOption("hideProgressBar",true)
.log("ID", getVar("ID")
)

//Demographics Instructions
newTrial( "demoIntro",
    newText("demointro","<p style=font-size:22px;><strong>Demographics and Language Survey</strong></p>" + 
            "<p style=font-size:18px;><strong>The last two pages are a voluntary demographic form.</strong></p>" + 
            "<p style=font-size:18px;>Completion of this form is completely up to you, and any information you provide will not be associated with your name or data in any way.</p>" + 
            "<p style=font-size:18px;>Our funding agency asks that we obtain the following demographic information from each participant, so that they can monitor gender and minority inclusion in research studies.</p>" +
            "<p style=font-size:18px;>If you have any questions, please feel free to email us at langcoglabweb@gmail.com. </p>" +
            "<p style=font-size:18px;> </p>" + 
            "<p style=font-size:18px;><strong>Our research team is interested in your language experience, since we study language use and development.</strong></p>" +
            "<p style=font-size:18px;>The language experience information will be kept separate from the demographic information, in accordance with our privacy regulations.</p>" +
            "<p style=font-size:18px;> </p>" +
            "<p style=font-size:18px;> </p>" + 
            "<p style=font-size:18px;> Press <Strong>Spacebar</Strong> to continue.</p>")
        .settings.center()
        .print()

,
    newKey("remIntro"," ")
        .wait()
,
    getText("demointro")
        .remove()
).setOption("hideProgressBar",true)
.log("ID", getVar("ID")
)

//Optional Demographics Questions
newTrial( "demographics",
    newText("age","<p style=font-size:18px;><Strong>Age:</Strong></p>")
,
    newTextInput("ageInput")
        .settings.log()
        .settings.size(100,25)
        .settings.lines(0)
,
    newText("gender", "<p style=font-size:18px;><Strong>Gender:</Strong></p>")
,
    newTextInput("genderInput")
        .settings.log()
        .settings.lines(0)
        .settings.size(100,25)
,
    newText("ethnicity","<p style=font-size:18px;><Strong>Ethnic Category:</Strong></p>")
,
    newScale("SEthnicity", "Hispanic or Latino", "Not Hispanic or Latino", "Prefer not to say")
        .vertical()
        .labelsPosition("right")
        .settings.log()
,
    newText("race","<p style=font-size:18px;><Strong>Racial Category:</Strong></p>")
,
    newText("other","<p style=font-size:18px;>If you chose other or would like to select multiple ethnic categories, please respond here:</p>")
,
    newTextInput("othermulti")
        .settings.log()
        .settings.lines(0)
        .settings.size(100,25)
,
    newScale("SRace", "American Indian/ Alaskan Native", "Asian", "Black/ African American", "Native Hawaiian/ Pacific Islander", "White/ Caucasian", "Prefer not to say", "Unknown", "Other")
        .vertical()
        .labelsPosition("right")
        .settings.log()
,
     newCanvas('democanvas', 800,600)
        .add("center at 50%", -50, getText("age"))
        .add("center at 50%", -10, getTextInput("ageInput"))
        .add("center at 50%", 25, getText("gender"))
        .add("center at 50%", 65, getTextInput("genderInput"))
        .add("center at 50%", 100, getText("ethnicity"))
        .add("center at 50%", 150, getScale("SEthnicity"))
        .add("center at 50%", 250, getText("race"))
        .add("center at 50%", 300, getScale("SRace"))
        .add("center at 50%", 450, getText("other"))
        .add("center at 50%", 500, getTextInput("othermulti"))
        .add("center at 50%", 575, newButton("language", "Next"))
        .print()
        .log()
,
    getButton("language")
        .wait()
).setOption("hideProgressBar",true)
.log("ID", getVar("ID")
)

//Language Experience Demographics Questions
newTrial( "language",
    newText("LangExp","<p style=font-size:22px;><Strong>Language Experience</Strong></p>")
,
    newText("native", "<p style=font-size:18px;>What is your native lange(s)?</p>" +
        "<p style=font-size:14px;>(A native language is the lagnuage (or languages) you learned from birth.)</p>")
,
    newTextInput("nativeInput")
        .settings.log()
        .settings.size(300,25)
        .settings.lines(0)
,
    newText("home", "<p style=font-size:18px;>What languages were primarily spoken in your home as a child?</p>")
,
    newTextInput("homeInput")
        .settings.log()
        .settings.lines(0)
        .settings.size(300,25)
,
    newText("additional","<p style=font-size:18px;>Please list all additional languages you have had experience with, how many years you have used them,</p>" +
        "<p style=font-size:18px;>and your level of proficiency with each (poor, can get by, near fluent, fluent, native speaker).</p>")
,
    newText("LangBox","<p style=font-size:18px;><Strong>Language</Strong></p>")
,
    newText("years","<p style=font-size:18px;><Strong>Years of Use</Strong></p>")
,
    newText("proficiency","<p style=font-size:18px;><Strong>Proficiency</Strong></p>")
,
    newTextInput("lang1")
        .settings.log()
        .settings.lines(0)
        .settings.size(500,25)
,
    newTextInput("lang2")
        .settings.log()
        .settings.lines(0)
        .settings.size(500,25)
,
    newTextInput("lang3")
        .settings.log()
        .settings.lines(0)
        .settings.size(500,25)
,
     newCanvas('langcanvas', 800,600)
        .add("center at 50%", 0, getText("LangExp"))
        .add("center at 50%", 75, getText("native"))
        .add("center at 50%", 160, getTextInput("nativeInput"))
        .add("center at 50%", 200, getText("home"))
        .add("center at 50%", 250, getTextInput("homeInput"))
        .add("center at 50%", 325, getText("additional"))
        .add(200, 400, getText("LangBox"))
        .add("center at 50%", 400, getText("years"))
        .add(600, 400, getText("proficiency"))
        .add(200, 450, getTextInput("lang1"))
        .add(200, 490, getTextInput("lang2"))
        .add(200, 530, getTextInput("lang3"))
        .add("center at 50%", 575, newButton("finished", "Done"))
        .print()
        .log()
,
    getButton("finished")
        .wait()
).setOption("hideProgressBar",true)
    .log("ID", getVar("ID")
)
    
newTrial( "bye" ,
    newText("<p style=font-size:18px;>Thank you for participating!</p>" +
            "<p style=font-size:18px;>Please copy and paste the following code on MTurk to receive credit:</p>" +
            "<p style=font-size:22;><strong>RedFrame5739</strong></p>")
        .center()
        .print()  
        .wait()
).setOption("hideProgressBar",true)

PennController.DebugOff()