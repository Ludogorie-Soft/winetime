import React from 'react';
import { Gutter } from '../../_components/ui-components/Gutter';
import { HR } from '../../_components/ui-components/HR';
import TransitonLayout from '../../_components/TransitionLayout';
import Image from 'next/image';

import classes from './index.module.scss';

export const dynamic = 'force-dynamic';

export default function AboutUs() {
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-center gap-4 items-center">
            <h3 className="text-4xl leading-10 font-normal">КАК ЗАПОЧНА ВСИЧКО</h3>
          </div>
          <HR />

          <div className="flex gap-2 md:gap-6 flex-col md:flex-row md:space-x-4 w-full">
            <div className="md:flex-1">
              <p className="text-lg leading-relaxed text-gray-600">
                Идеята за Wine Time бе родена в една зимна вечер, докато вечерях и отпивах червено
                вино в моя ресторант{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>
                , който ще ви представя по-късно. Замислих се, колко би ми харесало да се върна към
                имането на голям избор от италиански вина, точно както когато отварях ресторанта си.
                Съществуващите проблеми и трудностите свързани с толкова много марки в менюто на
                един единствен ресторант, ме връхлетяха в момент в който ме приближи клиент. Дамата,
                ентусиазирана от своята вечеря, ми направи комплимент за ресторанта. Тя бе удивена
                от качеството на храната, елегантността и професионализма на обслужване и
                атмосферата в{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>
                . Спомням си, че не беше лесно да отворя ресторанта и да направя{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>{' '}
                това, което исках. Тези думи ме изпълниха с радост и това, което липсваше, бе
                превъзходна селекция от вина. Бе приятно и задоволително да споделям своята страст
                към кетъринга в града,в който живея - Враца, но се зачудих защо да давам най-добрите
                италиански вина само на този град, като мога да го правя за цяла България ... и
                отвъд. От този момент идеята за Wine Time бе родена и за кратко време се разви в
                нещо още по-добро. Wine Time се трансформира от фокуса към най-добрите италиански
                вина, към привличане на всички най-добри вина и от този момент отваря вратите си към
                всички компании, които залагат на себе си и вярват в своя продукт. Wine Time
                предоставя своята онлайн платформа на компании, които искат да се развиват и да се
                впуснат в онлайн търговията, споделяйки и уважавайки нашия идеал: "Качеството на
                първо място".
              </p>
            </div>

            <div className="md:flex-1 flex items-center justify-center">
              <Image
                src="/assets/images/patricio.jpg"
                alt="Owner"
                placeholder="blur"
                blurDataURL="/assets/icons/placeholder.svg"
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className="md:flex-1">
              <p className="text-lg leading-relaxed text-gray-600">
                L'idea Wine time nasce una serata d'inverno, mentre stavo cenando e sorseggiavo un
                po’ di vino rosso, nel locale{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>{' '}
                che più tardi vi presenterò, pensavo a quanto mi sarebbe piaciuto tornare ad avere
                una vasta selezione di vini italiani, proprio come quando aprì il ristorante. Mi
                saltavano in mente solo i problemi che c’erano stati, le difficoltà che comportava
                aver tante etichette nel menu, di un unico ristorante. Ad un certo punto arrivò una
                cliente, era entusiasta della cena che aveva avuto, si complimenta con me del
                ristorante, era meravigliata dalla qualità del cibo, dall’eleganza, dalla
                professionalità nel servizio e dall'atmosfera che c'era a{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>
                . Ciò mi fece ricordare che non era stato semplice aprire il ristorante e portare{' '}
                <a
                  href="https://www.facebook.com/PiazzaItalia2018"
                  className="text-red-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Piazza Italia
                </a>
                , ad essere ciò che volevo, ma quelle parole, mi avevano riempito di gioia,
                un'ottima selezione di vini era proprio quello che mancava. Era stato bello e
                gratificante condividere la mia passione della ristorazione nella città in cui
                vivevo Vratsa, quando mi chiesi perché condividere i migliori vini italiani
                solamente a questa città, quando posso farlo con tutta la Bulgaria, e non solo. Da
                questo momento nasce l'idea Wine Time, che nel giro di poco cambiò in meglio.
                Trasformò l'ideale di distribuire i più prestigiosi vini italiani in Bulgaria, con
                quello di racchiudere nel proprio sito i migliori vini di qualità, di paesi diversi,
                non limitandosi a diffonderli solo in Bulgaria ma in tutta Europa. Wine Time apre le
                porte a tutte le aziende che credono in sé, e vogliono scommettere nel proprio
                prodotto. Wine Time mette a disposizione la propria piattaforma online alle aziende
                che hanno voglia di crescere, buttandosi nel commercio online, rispettando in nostro
                stesso ideale, la qualità al primo posto!
              </p>
            </div>
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  );
}
