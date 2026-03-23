import { useState } from 'react'
import { TabBar } from '../../../components/molecules/TabBar/TabBar'
import type { TabItem } from '../../../components/molecules/TabBar/TabBar'
import { Text } from '../../../components/atoms/Text/Text'
import { AccessibilitySection } from '../../helpers/AccessibilitySection'
import { CodeBlock } from '../../helpers/CodeBlock'
import { ComponentDemo } from '../../helpers/ComponentDemo'
import { Controls } from '../../helpers/Controls'
import { DocsPage, DocsSection } from '../../helpers/DocsPage'
import { DosAndDonts } from '../../helpers/DosAndDonts'
import { PropsTable } from '../../helpers/PropsTable'
import { StoryTabs } from '../../helpers/StoryTabs'

const baseTabs: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'data', label: 'Data' },
  { id: 'partners', label: 'Partners' },
  { id: 'reports', label: 'Reports' },
]

const tabIds = baseTabs.map((t) => t.id)

export function TabBarPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const patch = (key: string, val: unknown) => {
    if (key === 'activeTab') setActiveTab(String(val))
  }

  const values = { activeTab }
  const interactiveCode = `<TabBar
  tabs={tabs}
  activeTab="${activeTab}"
  onChange={setActiveTab}
/>

<div role="tabpanel">
  {activeTab === 'overview' && <p>Overview content</p>}
  …
</div>`

  const panelCopy: Record<string, string> = {
    overview: 'High-level KPIs and narrative for this pilot.',
    data: 'Underlying datasets powering the scorecard.',
    partners: 'Agencies, NGOs, and sponsors attached to the pilot.',
    reports: 'PDF exports and scheduled digests.',
  }

  return (
    <DocsPage
      title="TabBar"
      description="Horizontal tabs for switching related content without leaving the page."
      category="Molecules"
      status="stable"
      figmaNodeId="350:4112"
      since="v1.0.0"
    >
      <DocsSection title="Preview">
        <StoryTabs
          defaultStory={0}
          stories={[
            {
              label: 'Interactive',
              background: 'grid',
              center: true,
              code: interactiveCode,
              children: (
                <>
                  <ComponentDemo center padding="sm" background="transparent" fullWidth>
                    <div style={{ width: '100%', maxWidth: 'var(--space-1900)' }}>
                      <TabBar tabs={baseTabs} activeTab={activeTab} onChange={setActiveTab} />
                      <div
                        style={{ marginTop: 'var(--space-600)', padding: 'var(--space-400)' }}
                        role="tabpanel"
                        aria-label={panelCopy[activeTab] ?? 'Panel'}
                      >
                        <Text variant="body-md">{panelCopy[activeTab] ?? ''}</Text>
                      </div>
                    </div>
                  </ComponentDemo>
                  <Controls
                    values={values}
                    onChange={patch}
                    controls={[
                      {
                        type: 'select',
                        key: 'activeTab',
                        label: 'activeTab',
                        options: tabIds,
                        default: 'overview',
                      },
                    ]}
                  />
                </>
              ),
            },
            {
              label: 'Default',
              background: 'grid',
              center: true,
              code: `<TabBar
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'data', label: 'Data' },
    { id: 'partners', label: 'Partners' },
    { id: 'reports', label: 'Reports' },
  ]}
  defaultTab="overview"
/>`,
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TabBar tabs={baseTabs} defaultTab="overview" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Disabled tab',
              background: 'grid',
              center: true,
              code: '<TabBar tabs={[{ id: "a", label: "Active" }, { id: "b", label: "Soon", disabled: true }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TabBar
                    tabs={[
                      { id: 'a', label: 'Active' },
                      { id: 'b', label: 'Soon', disabled: true },
                    ]}
                    defaultTab="a"
                  />
                </ComponentDemo>
              ),
            },
            {
              label: 'With badge',
              background: 'grid',
              center: true,
              code: '<TabBar tabs={[{ id: "inbox", label: "Inbox", badge: 3 }]} />',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TabBar tabs={[{ id: 'inbox', label: 'Inbox', badge: 3 }]} defaultTab="inbox" />
                </ComponentDemo>
              ),
            },
            {
              label: 'Content switch',
              background: 'grid',
              center: true,
              code: 'Combine TabBar with local state to swap tabpanel regions.',
              children: (
                <ComponentDemo center padding="sm" background="transparent" fullWidth>
                  <TabContentSwitchDemo />
                </ComponentDemo>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Usage">
        <CodeBlock
          language="tsx"
          code={`import { TabBar } from './components/molecules/TabBar/TabBar'

<TabBar tabs={tabs} activeTab={tab} onChange={setTab} />`}
        />
      </DocsSection>
      <DocsSection title="Props">
        <PropsTable
          props={[
            { name: 'tabs', type: 'TabItem[]', description: 'id, label, optional disabled and badge.', required: true },
            { name: 'activeTab', type: 'string', description: 'Controlled active id.', required: false },
            { name: 'onChange', type: '(tabId: string) => void', description: 'Selection callback.', required: false },
            { name: 'defaultTab', type: 'string', description: 'Initial id when uncontrolled.', required: false },
          ]}
        />
      </DocsSection>
      <DocsSection title="Do's and Don'ts">
        <DosAndDonts
          items={[
            {
              type: 'do',
              description: 'Use for peer views at the same hierarchy level (details, data, history).',
              children: <TabBar tabs={baseTabs} defaultTab="overview" />,
            },
            {
              type: 'dont',
              description: "Don't exceed ~7 tabs — overflow becomes hard to scan.",
              children: (
                <span style={{ color: 'var(--text-default-caption)' }}>Consider accordions or nested routes.</span>
              ),
            },
          ]}
        />
      </DocsSection>
      <DocsSection title="Accessibility">
        <AccessibilitySection
          wcagLevel="AA"
          items={[
            {
              type: 'aria',
              label: 'Tablist',
              description: 'Buttons expose role="tab" with aria-selected reflecting activation.',
            },
            {
              type: 'keyboard',
              label: 'Navigation',
              description: 'Arrow keys between tabs are recommended; pair TabBar with focus management in your shell.',
            },
          ]}
        />
      </DocsSection>
    </DocsPage>
  )
}

function TabContentSwitchDemo() {
  const [t, setT] = useState('overview')
  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'data', label: 'Data' },
    { id: 'partners', label: 'Partners' },
    { id: 'reports', label: 'Reports' },
  ]
  return (
    <div style={{ width: '100%', maxWidth: 'var(--space-1900)' }}>
      <TabBar tabs={tabs} activeTab={t} onChange={setT} />
      <div style={{ marginTop: 'var(--space-500)' }}>
        <Text variant="body-sm">Active tab: {t}</Text>
      </div>
    </div>
  )
}
