import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './docs/layout/DocsLayout'
import { ElevationPage } from './docs/pages/ElevationPage'
import { GridPage } from './docs/pages/GridPage'
import { IntroPage } from './docs/pages/IntroPage'
import { LayoutPage } from './docs/pages/LayoutPage'
import { TokensPage } from './docs/pages/TokensPage'
import { AvatarPage } from './docs/pages/atoms/AvatarPage'
import { BadgePage } from './docs/pages/atoms/BadgePage'
import { BlockquotePage } from './docs/pages/atoms/BlockquotePage'
import { ButtonPage } from './docs/pages/atoms/ButtonPage'
import { CodePage } from './docs/pages/atoms/CodePage'
import { DividerPage } from './docs/pages/atoms/DividerPage'
import { FieldPage } from './docs/pages/atoms/FieldPage'
import { HeadingPage } from './docs/pages/atoms/HeadingPage'
import { ImagePage } from './docs/pages/atoms/ImagePage'
import { LabelPage } from './docs/pages/atoms/LabelPage'
import { LinkPage } from './docs/pages/atoms/LinkPage'
import { LoaderPage } from './docs/pages/atoms/LoaderPage'
import { MapPinPage } from './docs/pages/atoms/MapPinPage'
import { RatingPage } from './docs/pages/atoms/RatingPage'
import { SkeletonPage } from './docs/pages/atoms/SkeletonPage'
import { TagPage } from './docs/pages/atoms/TagPage'
import { TextPage } from './docs/pages/atoms/TextPage'
import { BreadcrumbPage } from './docs/pages/molecules/BreadcrumbPage'
import { ButtonGroupPage } from './docs/pages/molecules/ButtonGroupPage'
import { CheckboxPage } from './docs/pages/molecules/CheckboxPage'
import { ContextMenuPage } from './docs/pages/molecules/ContextMenuPage'
import { DatePickerPage } from './docs/pages/molecules/DatePickerPage'
import { DropdownPage } from './docs/pages/molecules/DropdownPage'
import { EmptyStatePage } from './docs/pages/molecules/EmptyStatePage'
import { FileUploadPage } from './docs/pages/molecules/FileUploadPage'
import { FilterBarPage } from './docs/pages/molecules/FilterBarPage'
import { InputPage } from './docs/pages/molecules/InputPage'
import { ListPage } from './docs/pages/molecules/ListPage'
import { NotificationBarPage } from './docs/pages/molecules/NotificationBarPage'
import { PaginationPage } from './docs/pages/molecules/PaginationPage'
import { PopoverPage } from './docs/pages/molecules/PopoverPage'
import { ProgressBarPage } from './docs/pages/molecules/ProgressBarPage'
import { ProgressCirclePage } from './docs/pages/molecules/ProgressCirclePage'
import { RadioButtonPage } from './docs/pages/molecules/RadioButtonPage'
import { SearchBarPage } from './docs/pages/molecules/SearchBarPage'
import { SocialButtonPage } from './docs/pages/molecules/SocialButtonPage'
import { StatCardPage } from './docs/pages/molecules/StatCardPage'
import { StepperPage } from './docs/pages/molecules/StepperPage'
import { SubscribeWidgetPage } from './docs/pages/molecules/SubscribeWidgetPage'
import { SwitchPage } from './docs/pages/molecules/SwitchPage'
import { TabBarPage } from './docs/pages/molecules/TabBarPage'
import { TextAreaPage } from './docs/pages/molecules/TextAreaPage'
import { TooltipPage } from './docs/pages/molecules/TooltipPage'
import { AccordionPage } from './docs/pages/organisms/AccordionPage'
import { AlertPage } from './docs/pages/organisms/AlertPage'
import { BannerPage } from './docs/pages/organisms/BannerPage'
import { CardPage } from './docs/pages/organisms/CardPage'
import { ErrorPagePage } from './docs/pages/organisms/ErrorPagePage'
import { FooterPage } from './docs/pages/organisms/FooterPage'
import { FormsPage } from './docs/pages/organisms/FormsPage'
import { GridLayoutPage } from './docs/pages/organisms/GridLayoutPage'
import { MenuPage } from './docs/pages/organisms/MenuPage'
import { ModalPage } from './docs/pages/organisms/ModalPage'
import { NavbarPage } from './docs/pages/organisms/NavbarPage'
import { PanelPage } from './docs/pages/organisms/PanelPage'
import { ProfileCardPage } from './docs/pages/organisms/ProfileCardPage'
import { RegistrationModalPage } from './docs/pages/organisms/RegistrationModalPage'
import { SecondaryNavPage } from './docs/pages/organisms/SecondaryNavPage'
import { SuccessScreenPage } from './docs/pages/organisms/SuccessScreenPage'
import { TablePage } from './docs/pages/organisms/TablePage'
import { ToastPage } from './docs/pages/organisms/ToastPage'
import { VideoCardPage } from './docs/pages/organisms/VideoCardPage'
import { VideoPlayerPage } from './docs/pages/organisms/VideoPlayerPage'
import DesignSystemHome from './DesignSystemHome'
import { AtomsOverviewPage } from './docs/pages/AtomsOverviewPage'
import { MoleculesOverviewPage } from './docs/pages/MoleculesOverviewPage'
import { NotFoundPage } from './docs/pages/NotFoundPage'
import { OrganismsOverviewPage } from './docs/pages/OrganismsOverviewPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DesignSystemHome />} />

      <Route path="/docs" element={<DocsLayout />}>
        <Route index element={<IntroPage />} />
        <Route path="atoms" element={<AtomsOverviewPage />} />
        <Route path="molecules" element={<MoleculesOverviewPage />} />
        <Route path="organisms" element={<OrganismsOverviewPage />} />
        <Route path="tokens" element={<TokensPage />} />
        <Route path="layout" element={<LayoutPage />} />
        <Route path="grid" element={<GridPage />} />
        <Route path="elevation" element={<ElevationPage />} />
        <Route path="blur" element={<ElevationPage />} />

        <Route path="atoms/button" element={<ButtonPage />} />
        <Route path="atoms/label" element={<LabelPage />} />
        <Route path="atoms/field" element={<FieldPage />} />
        <Route path="atoms/link" element={<LinkPage />} />
        <Route path="atoms/badge" element={<BadgePage />} />
        <Route path="atoms/tag" element={<TagPage />} />
        <Route path="atoms/loader" element={<LoaderPage />} />
        <Route path="atoms/divider" element={<DividerPage />} />
        <Route path="atoms/avatar" element={<AvatarPage />} />
        <Route path="atoms/skeleton" element={<SkeletonPage />} />
        <Route path="atoms/heading" element={<HeadingPage />} />
        <Route path="atoms/text" element={<TextPage />} />
        <Route path="atoms/blockquote" element={<BlockquotePage />} />
        <Route path="atoms/code" element={<CodePage />} />
        <Route path="atoms/image" element={<ImagePage />} />
        <Route path="atoms/mappin" element={<MapPinPage />} />
        <Route path="atoms/rating" element={<RatingPage />} />

        <Route path="molecules/input" element={<InputPage />} />
        <Route path="molecules/checkbox" element={<CheckboxPage />} />
        <Route path="molecules/radiobutton" element={<RadioButtonPage />} />
        <Route path="molecules/switch" element={<SwitchPage />} />
        <Route path="molecules/textarea" element={<TextAreaPage />} />
        <Route path="molecules/dropdown" element={<DropdownPage />} />
        <Route path="molecules/searchbar" element={<SearchBarPage />} />
        <Route path="molecules/breadcrumb" element={<BreadcrumbPage />} />
        <Route path="molecules/tooltip" element={<TooltipPage />} />
        <Route path="molecules/progressbar" element={<ProgressBarPage />} />
        <Route path="molecules/progresscircle" element={<ProgressCirclePage />} />
        <Route path="molecules/tabbar" element={<TabBarPage />} />
        <Route path="molecules/buttongroup" element={<ButtonGroupPage />} />
        <Route path="molecules/socialbutton" element={<SocialButtonPage />} />
        <Route path="molecules/pagination" element={<PaginationPage />} />
        <Route path="molecules/statcard" element={<StatCardPage />} />
        <Route path="molecules/emptystate" element={<EmptyStatePage />} />
        <Route path="molecules/stepper" element={<StepperPage />} />
        <Route path="molecules/fileupload" element={<FileUploadPage />} />
        <Route path="molecules/list" element={<ListPage />} />
        <Route path="molecules/filterbar" element={<FilterBarPage />} />
        <Route path="molecules/datepicker" element={<DatePickerPage />} />
        <Route path="molecules/contextmenu" element={<ContextMenuPage />} />
        <Route path="molecules/popover" element={<PopoverPage />} />
        <Route path="molecules/notificationbar" element={<NotificationBarPage />} />
        <Route path="molecules/subscribewidget" element={<SubscribeWidgetPage />} />

        <Route path="organisms/accordion" element={<AccordionPage />} />
        <Route path="organisms/card" element={<CardPage />} />
        <Route path="organisms/forms" element={<FormsPage />} />
        <Route path="organisms/profilecard" element={<ProfileCardPage />} />
        <Route path="organisms/videocard" element={<VideoCardPage />} />
        <Route path="organisms/registrationmodal" element={<RegistrationModalPage />} />
        <Route path="organisms/navbar" element={<NavbarPage />} />
        <Route path="organisms/secondarynav" element={<SecondaryNavPage />} />
        <Route path="organisms/footer" element={<FooterPage />} />
        <Route path="organisms/alert" element={<AlertPage />} />
        <Route path="organisms/toast" element={<ToastPage />} />
        <Route path="organisms/modal" element={<ModalPage />} />
        <Route path="organisms/menu" element={<MenuPage />} />
        <Route path="organisms/table" element={<TablePage />} />
        <Route path="organisms/banner" element={<BannerPage />} />
        <Route path="organisms/panel" element={<PanelPage />} />
        <Route path="organisms/videoplayer" element={<VideoPlayerPage />} />
        <Route path="organisms/gridlayout" element={<GridLayoutPage />} />
        <Route path="organisms/errorpage" element={<ErrorPagePage />} />
        <Route path="organisms/successscreen" element={<SuccessScreenPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
