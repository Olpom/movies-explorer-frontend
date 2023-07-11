import React from 'react';
import './AboutProject.css'

function AboutProject() {
    return (
        <section className='project' id='aboutproject'>
            <div className='project__section'>
                <div className='project__heading'>
                    <h2 className='project__title'>О проекте</h2>
                </div>
                <div className='project__container'>
                    <div className='project__discription'>
                        <p className='project__subtitle'>Дипломный проект включал 5 этапов</p>
                        <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='project__discription'>
                        <p className='project__subtitle'>На выполнение диплома ушло 5 недель</p>
                        <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>

                <div className='project__timeline'>
                    <div className='project__back'>
                        <p className='project__timeline-title project__timeline-title_back'>1 неделя</p>
                        <p className='project__timeline-text'>Back-end</p>
                    </div>
                    <div className='project__front'>
                        <p className='project__timeline-title project__timeline-title_front'>4 недели</p>
                        <p className='project__timeline-text'>Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
