import { Selector } from 'testcafe';
import axios from 'axios';

fixture`Final Exam`
  .page`http://localhost:3000`;

test('Final Exam', async t => {
  await t.click('#reset');
  // 10 points for click on box and display the player who clicked it
  await t.click('#box-0');
  await t.expect(Selector('#box-0').textContent).contains('1');
  await axios.get('http://localhost:3000/api/play?playerId=2&position=2'); // 10 points for creating endpoint
  await t.expect(Selector('#box-2').textContent).contains('2'); // 10 points for ws update
  await t.click('#box-3');
  await t.expect(Selector('#box-3').textContent).contains('1');
  await axios.get('http://localhost:3000/api/play?playerId=2&position=5');
  await t.expect(Selector('#box-5').textContent).contains('2');
  await t.click('#box-3');
  await t.expect(Selector('#winner').textContent).contains('Winner is 1'); // 10 points for display winner
  await t.click('#reset'); // 10 points for reset
  await t.expect(Selector('#box-0').textContent).notContains('1');
});