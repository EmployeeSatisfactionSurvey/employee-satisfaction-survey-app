import { Component, OnInit } from '@angular/core';
import { Model, StylesManager } from 'survey-core';

// const SURVEY_ID = 1;

StylesManager.applyTheme('modern');

const surveyJson = {
  title: 'Your opinion counts!',
  description: 'Please express what you think about your job?',
  pages: [
    {
      elements: [
        {
          name: 'Name',
          title: 'Enter your full name:',
          type: 'text',
        },
        {
          name: 'OverallSatisfaction',
          title:
            'How would you describe your overall level of job satisfaction?',
          type: 'radiogroup',
          isRequired: true,
          choices: [
            'Very satisfied',
            'Satisfied',
            'Neutral',
            'Dissatisfied',
            'Very dissatisfied',
          ],
        },
        {
          name: 'Quality',
          title: 'How would you rate the following?',
          type: 'matrix',
          isRequired: true,
          columns: [
            {
              value: 1,
              text: 'Very poor',
            },
            {
              value: 2,
              text: 'Poor',
            },
            {
              value: 3,
              text: 'Average',
            },
            {
              value: 4,
              text: 'Good',
            },
            {
              value: 5,
              text: 'Excellent',
            },
          ],
          rows: [
            {
              value: 'Salary',
              text: 'Salary',
            },
            {
              value: 'OverallBenefits',
              text: 'Overall benefits',
            },
            {
              value: 'HealthBenefits',
              text: 'Health benefits',
            },
            {
              value: 'PhysicalWorkEnvironment',
              text: 'Physical work environment',
            },
            {
              value: 'TrainingOpportunities',
              text: 'Training opportunities',
            },
            {
              value: 'WorkingTimeFlexibility',
              text: 'Working time flexibility',
            },
          ],
        },
        {
          name: 'ValuedAtWork',
          title: 'Do you feel valued at work?',
          type: 'radiogroup',
          isRequired: true,
          choices: ['Yes', 'No'],
        },
        {
          name: 'Explanation',
          title: 'If no please explain',
          visibleIf: "{ValuedAtWork}='No'",
          type: 'comment',
        },
        {
          name: 'Feedback',
          title: 'Please Provide Any Additional Feedback',
          type: 'comment',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'My First Survey';
  surveyModel: Model;
  logSurveyResults(sender) {
    console.log(sender.data);
  }
  saveSurveyResults(sender) {
    const request = new XMLHttpRequest();
    const url = 'http://localhost:3001/surveys';
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(sender.data));
  }
  ngOnInit() {
    const survey = new Model(surveyJson);
    survey.onComplete.add(this.saveSurveyResults);
    this.surveyModel = survey;
  }
}
