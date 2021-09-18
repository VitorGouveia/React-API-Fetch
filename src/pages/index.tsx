import { FC, useState } from 'react';

import { Bracket } from '../components';
import Button from '../components/buttons/Button';

const HomePage: FC = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const icons = ['x', '+', '-'];
  const [currentIcon, setCurrentIcon] = useState<string>('x');
  const currentIconIndex = icons.indexOf(currentIcon);

  const hasNext = currentIconIndex + 1 < icons.length;

  const cycle = () => {
    if (hasNext) {
      const next = currentIconIndex + 1;
      setCurrentIcon(icons[next]);
    } else {
      const next = 0;
      setCurrentIcon(icons[next]);
    }
  };

  return (
    <>
      <main className='🌽'>
        <section className='🇲🇽'>
          <form>
            <Bracket className='❤️‍🔥' cols='4' rows='2' />
            <Button onClick={() => cycle()}>
              <p>{currentIcon}</p>
            </Button>
            <Bracket className='🔥' cols='4' rows='2' />

            <Button type='submit' onClick={() => setShowAnswer(!showAnswer)}>
              Calcular
            </Button>

            {showAnswer ? (
              <Bracket className='✔️ 🎂' cols='4' rows='2' />
            ) : (
              <Bracket className='✔️' cols='4' rows='2' />
            )}
          </form>
        </section>
      </main>
    </>
  );
};

export default HomePage;
