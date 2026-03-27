<script setup>
import { ArrowDownRight, ArrowRight, BookOpen, Users2 } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
</script>

<template>
  <section class="relative w-full flex items-center bg-white py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
        <div class="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
          <Badge variant="outline"
            class="group hover:bg-primary/90 hover:text-primary-foreground transition-all duration-300">
            New Arrival
            <ArrowDownRight
              class="ml-2 size-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
          </Badge>
          <h1 class="text-pretty text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
            Welcome to <span class="text-primary">VueBlocks</span>
          </h1>
          <p class="text-lg max-w-[42rem] text-muted-foreground font-medium text-black lg:text-xl">
            Discover our collection of high-quality Vue 3 components.
            Perfect for modern web projects, optimized for performance and
            easy to integrate.
          </p>
          <p class="text-lg max-w-[42rem] text-muted-foreground lg:text-xl">
            Built by developers for developers. With a focus on simplicity and
            accessibility. Ready to take your web development to the next level.
          </p>
          <div class="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg" class="w-full sm:w-auto group" @click="navigateTo('/dashboard')">
              <span class="group-hover:translate-x-0.5 transition-transform duration-300">
                Dashboard
              </span>
              <ArrowRight class="ml-2 size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
            <Button size="lg" variant="outline"
              class="w-full sm:w-auto group hover:bg-primary/10 transition-colors duration-300">
              <span class="group-hover:translate-x-0.5 transition-transform duration-300">
                Documentation
              </span>
              <BookOpen class="ml-2 size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </div>
        </div>
        <div class="relative">
          <div class="relative overflow-hidden rounded-xl">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
              alt="Vue Components Preview"
              class="aspect-[16/10] w-full object-cover shadow-2xl transition-all duration-300 hover:scale-[1.02]" />
            <div class="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10"></div>
          </div>
          <div
            class="absolute -bottom-4 -right-4 flex items-center gap-3 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 shadow-lg ring-1 ring-black/5">
            <span class="flex -space-x-3">
              <Avatar v-for="i in 3" :key="i" class="border-2 border-background ring-2 ring-primary/10">
                <AvatarImage :src="`/images/avatars/${i}.jpg`" :alt="`Developer ${i}`" />
              </Avatar>
            </span>
            <Badge variant="secondary" class="bg-secondary/80 shadow-sm">
              <Users2 class="mr-1.5 size-3.5" />
              2k+ Users
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
