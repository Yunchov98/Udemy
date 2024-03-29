import { useState } from 'react';

import { EXAMPLES } from '../data';

import TabButton from './TabButton';
import Section from './Section';
import Tabs from './Tabs';

export default function Examples() {
    const [selectedTopic, setSelectedTopic] = useState();

    const handleChange = (selectedButton) => setSelectedTopic(selectedButton);

    return (
        <Section title="Examples" id="examples">
            <Tabs
                buttons={
                    <>
                        <TabButton
                            isSelected={selectedTopic === 'components'}
                            onClick={() => handleChange('components')}
                        >
                            Components
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'jsx'}
                            onClick={() => handleChange('jsx')}
                        >
                            JSX
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'props'}
                            onClick={() => handleChange('props')}
                        >
                            Props
                        </TabButton>
                        <TabButton
                            isSelected={selectedTopic === 'state'}
                            onClick={() => handleChange('state')}
                        >
                            State
                        </TabButton>
                    </>
                }
            >
                {' '}
                {!selectedTopic && <p>Please select a topic.</p>}
                {selectedTopic && (
                    <div id="tab-content">
                        <h3>{EXAMPLES[selectedTopic].title}</h3>
                        <p>{EXAMPLES[selectedTopic].description}</p>
                        <pre>
                            <code>{EXAMPLES[selectedTopic].code}</code>
                        </pre>
                    </div>
                )}
            </Tabs>
        </Section>
    );
}
