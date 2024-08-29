import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Component() {
  return (
    <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
              Simplify DNS Management
              <span className="text-primary"> with SwiftDNS</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Effortlessly manage your DNS records for Cloudflare and Vercel. Save time, reduce
              errors, and streamline your workflow.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              View Demo
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Few-clicks DNS setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Cloudflare integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Vercel compatibility</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Real-time DNS propagation</span>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl" />
          <div className="relative flex aspect-square w-full max-w-[400px] items-center justify-center rounded-xl border border-border bg-background/80 p-6 backdrop-blur-sm">
            <svg
              className="h-52 w-52 text-primary"
              viewBox="0 0 778 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.71838 566.143C4.71838 555.571 8.86481 545.143 17.1577 534.857L437.09 24.4286C445.669 14.1429 454.82 7.85717 464.542 5.57145C474.265 3.28574 482.986 4.28574 490.708 8.57145C498.715 12.5715 504.291 19.1429 507.436 28.2857C510.582 37.4286 509.724 48.4286 504.863 61.2857L369.318 419.571H628.827C639.407 419.571 647.986 422.857 654.563 429.429C661.426 435.714 664.857 443.857 664.857 453.857C664.857 464.429 660.711 474.857 652.419 485.143L232.485 995.575C223.907 1005.86 214.757 1012.14 205.033 1014.43C195.311 1017 186.446 1016.15 178.439 1011.86C170.718 1007.85 165.285 1001.14 162.14 991.717C158.994 982.574 159.852 971.575 164.713 958.711L300.258 600.429H40.7493C30.4548 600.429 21.876 597.285 15.0129 591C8.14991 584.429 4.71838 576.143 4.71838 566.143Z"
                className="fill-secondary-foreground"
              />
              <path
                d="M114.527 566.143C114.527 555.571 118.674 545.143 126.966 534.857L546.899 24.4286C555.478 14.1429 564.628 7.85717 574.351 5.57145C584.074 3.28574 592.795 4.28574 600.516 8.57145C608.523 12.5715 614.1 19.1429 617.245 28.2857C620.391 37.4286 619.533 48.4286 614.672 61.2857L479.127 419.571H738.636C749.216 419.571 757.795 422.857 764.371 429.429C771.234 435.714 774.666 443.857 774.666 453.857C774.666 464.429 770.52 474.857 762.227 485.143L342.294 995.575C333.716 1005.86 324.565 1012.14 314.842 1014.43C305.12 1017 296.255 1016.15 288.248 1011.86C280.527 1007.85 275.094 1001.14 271.949 991.717C268.803 982.574 269.661 971.575 274.522 958.711L410.067 600.429H150.558C140.263 600.429 131.684 597.285 124.821 591C117.958 584.429 114.527 576.143 114.527 566.143Z"
                className="fill-primary"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
