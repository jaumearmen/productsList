# CLAUDE.md

This file provides guidance to Claude Code when working with this React TypeScript Vite project with shadcn/ui.

## Project Overview

This is a modern React TypeScript application built with:
- **Vite** for fast development and building
- **React 19** with TypeScript
- **shadcn/ui** component library (New York style)
- **Tailwind CSS v4** for styling
- **Radix UI** primitives for accessible components

## Commands

### Development
- **Install dependencies**: `bun install`
- **Start dev server**: `bun run dev`
- **Build**: `bun run build` (runs TypeScript check + Vite build)
- **Preview build**: `bun run preview`
- **Lint**: `bun run lint`

### Package Manager
This project uses **Bun** as the package manager (bun.lock present).

## Project Structure

```
src/
├── components/
│   └── ui/           # shadcn/ui components (40+ components)
├── hooks/            # Custom React hooks
├── lib/
│   └── utils.ts      # Utility functions (cn, etc.)
├── assets/           # Static assets
├── App.tsx           # Main application component
├── main.tsx          # React entry point
└── index.css         # Global styles with Tailwind
```

## Configuration

### shadcn/ui Setup
- **Style**: "new-york"
- **Base Color**: neutral
- **CSS Variables**: enabled
- **Icon Library**: lucide-react

### Path Aliases
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/utils` → `src/lib/utils`
- `@/ui` → `src/components/ui`
- `@/hooks` → `src/hooks`

### TypeScript
- Separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)
- Strict typing enabled

## Available UI Components

The project includes a full shadcn/ui component library:
- Layout: Card, Separator, Aspect Ratio, Resizable
- Navigation: Breadcrumb, Navigation Menu, Menubar, Pagination
- Forms: Input, Textarea, Select, Checkbox, Radio Group, Switch, Button
- Feedback: Alert, Alert Dialog, Toast (Sonner), Progress, Skeleton
- Overlays: Dialog, Sheet, Drawer, Popover, Tooltip, Hover Card
- Data Display: Table, Badge, Avatar, Accordion, Tabs, Carousel
- Charts: Recharts integration

## Key Dependencies

### UI & Styling
- `@radix-ui/*` - Accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Conditional classes

### Forms & Validation
- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation

### Utilities
- `lucide-react` - Icon library
- `date-fns` - Date utilities
- `next-themes` - Theme management