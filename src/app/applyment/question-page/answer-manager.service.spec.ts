import {
  TestBed,
  inject,
  async,
  tick,
  fakeAsync,
  discardPeriodicTasks,
} from '@angular/core/testing';

import { AnswerManagerService } from './answer-manager.service';
import { Answer } from '../../shared/model/answer';

describe('AnswerManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnswerManagerService],
    });
  });

  it(
    'should be created',
    inject([AnswerManagerService], (service: AnswerManagerService) => {
      expect(service).toBeTruthy();
    }),
  );

  it(
    "item's visualizedTime should be incremented by 1",
    async(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer({});
        service.register(answer).subscribe((updatedAnswer: Answer) => {
          expect(updatedAnswer.visualizedTimes).toEqual(1);
        });
      }),
    ),
  );

  it(
    'updates optionId and emit',
    async(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer();
        const expectedAnswers = [
          new Answer({ visualizedTimes: 1 }), // first emission
          new Answer({ visualizedTimes: 1, optionId: 2 }),
        ];
        const answers = [];
        service.register(answer).subscribe(updatedAnswer => {
          answers.push(updatedAnswer);
        });

        service.setOption(2);
        expect(answers).toEqual(expectedAnswers);
      }),
    ),
  );

  it(
    'update spentTimeInSeconds by 3',
    fakeAsync(
      inject([AnswerManagerService], (service: AnswerManagerService) => {
        const answer = new Answer();
        let lastEmittedAnswer: Answer;

        service
          .register(answer)
          .subscribe(emittedAnswer => lastEmittedAnswer = emittedAnswer);

        tick(3000);
        expect(lastEmittedAnswer).toEqual(new Answer({
          visualizedTimes: 1,
          spentTimeInSeconds: 3,
        }));
        discardPeriodicTasks();
      }),
    ),
  );
});
