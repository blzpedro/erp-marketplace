import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Switch } from '../../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Calendar } from '../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { Separator } from '../../components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'
import { Skeleton } from '../../components/ui/skeleton'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet'
import { MessageModal } from '../../components/MessageModal'
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

export default function UI() {
  const [date, setDate] = useState<Date>()
  const [isOpen, setIsOpen] = useState(false)
  const [modalState, setModalState] = useState<{
    open: boolean
    variant: "success" | "warning" | "error"
    title?: string
    message: string
  }>({
    open: false,
    variant: "success",
    message: "",
  })

  const showModal = (variant: "success" | "warning" | "error", title?: string, message?: string) => {
    setModalState({
      open: true,
      variant,
      title,
      message: message || `This is a ${variant} message.`,
    })
  }

  const handleClose = () => {
    setModalState(prev => ({ ...prev, open: false }))
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Componentes</h1>
        <p className="text-gray-600">Componentes Shadcn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Button</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Input */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Input</h3>
          <div className="space-y-2">
            <Input placeholder="Enter text..." />
            <Input type="email" placeholder="Enter email..." />
            <Input type="password" placeholder="Enter password..." />
          </div>
        </div>

        {/* Select */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Select</h3>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Switch */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Switch</h3>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <label htmlFor="airplane-mode">Airplane Mode</label>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Tabs</h3>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Account settings content</TabsContent>
            <TabsContent value="password">Password settings content</TabsContent>
          </Tabs>
        </div>

        {/* Calendar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Calendar</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Dropdown Menu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Dropdown Menu</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tooltip */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Tooltip</h3>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="relative">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-black text-white border-black z-[9999]"
                sideOffset={5}
              >
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Separator */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Separator</h3>
          <div className="space-y-2">
            <div>Content above</div>
            <Separator />
            <div>Content below</div>
          </div>
        </div>

        {/* Collapsible */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Collapsible</h3>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                Click to toggle
                {isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <div className="rounded-md border px-4 py-2 text-sm">
                This content is collapsible
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Skeleton</h3>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        {/* Sheet */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sheet</h3>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  This is a sheet component example.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <p>Sheet content goes here...</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Message Modal */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Message Modal</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => showModal("success", "Operation Successful", "Your action was completed successfully!")}
              variant="default"
            >
              Success
            </Button>
            <Button 
              onClick={() => showModal("warning", "Warning", "Please review your input before proceeding.")}
              variant="outline"
            >
              Warning
            </Button>
            <Button 
              onClick={() => showModal("error", "Error Occurred", "Something went wrong. Please try again.")}
              variant="destructive"
            >
              Error
            </Button>
          </div>
        </div>
      </div>

      <MessageModal
        open={modalState.open}
        variant={modalState.variant}
        title={modalState.title}
        message={modalState.message}
        onClose={handleClose}
      />
    </div>
  )
} 