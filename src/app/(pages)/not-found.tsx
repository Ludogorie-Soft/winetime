import { Button } from '../_components/Buttons/Button'
import { TypographyH1 } from '../_components/typography/typography-h1'
import { TypographyH2 } from '../_components/typography/typography-h2'
import { Gutter } from '../_components/ui-components/Gutter'
import { VerticalPadding } from '../_components/ui-components/VerticalPadding'

export default function NotFound() {
  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <div className="w-full flex flex-col items-center justify-center mt-10 gap-4">
          <TypographyH1 text="404" />
          <TypographyH2 text="Тази страница не е намерена." />
          <Button href="/" label="Начало" appearance="primary" />
        </div>
      </VerticalPadding>
    </Gutter>
  )
}
