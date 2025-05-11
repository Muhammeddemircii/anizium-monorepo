'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LucideIcon } from 'lucide-react'

interface PolicyItem {
  text: string
  emphasis?: boolean
  list?: string[]
}

interface PolicySection {
  id: string
  icon: LucideIcon
  title: string
  content: PolicyItem[]
}

interface PolicyProps {
  title: string
  subtitle?: string
  sections: PolicySection[]
}

export function Policy({ title, subtitle, sections }: PolicyProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Accordion type="multiple" className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-none [&[data-state=open]]:bg-muted/50"
              >
                <AccordionTrigger className="gap-4 rounded-lg px-4 py-3 hover:bg-muted/50 hover:no-underline [&[data-state=open]]:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2.5">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-medium">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-1">
                  <div className="space-y-6 pl-[3.25rem] text-muted-foreground">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <p
                          className={
                            item.emphasis ? 'text-lg font-medium text-foreground' : 'text-lg'
                          }
                        >
                          {item.text}
                        </p>
                        {item.list && (
                          <ul className="ml-6 list-disc space-y-2 text-lg">
                            {item.list.map((listItem, listIndex) => (
                              <li key={listIndex}>{listItem}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
