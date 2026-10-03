import { useState } from "react";
import { Link } from "wouter";
import { Shield, Droplet, Info, ThermometerSun, AlertCircle, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SafetyTips() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Water Safety & Purification</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Essential guidelines from health authorities on identifying contaminated water and making it safe for consumption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="border-l-4 border-l-destructive shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <AlertCircle className="text-destructive h-6 w-6" />
              Signs of Contamination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="bg-destructive/10 text-destructive p-1 rounded-full mt-0.5"><Droplet className="h-3 w-3" /></span>
                <div>
                  <strong className="block text-slate-800">Cloudiness or Turbidity</strong>
                  <span className="text-sm text-slate-600">Water should be perfectly clear. Murkiness indicates suspended particles or bacteria.</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-destructive/10 text-destructive p-1 rounded-full mt-0.5"><Droplet className="h-3 w-3" /></span>
                <div>
                  <strong className="block text-slate-800">Unusual Odor</strong>
                  <span className="text-sm text-slate-600">Chlorine smell is normal. Rotten egg, sulfur, or metallic smells indicate severe contamination.</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-destructive/10 text-destructive p-1 rounded-full mt-0.5"><Droplet className="h-3 w-3" /></span>
                <div>
                  <strong className="block text-slate-800">Color Changes</strong>
                  <span className="text-sm text-slate-600">Brown, yellow, or reddish tint typically means rusted pipes or iron. Blue/green indicates copper corrosion.</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="text-green-600 h-6 w-6" />
              Emergency Purification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 border-b border-slate-100 pb-3">
                <div className="bg-green-100 text-green-700 h-8 w-8 rounded flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <strong className="block text-slate-800">Boiling (Most Effective)</strong>
                  <span className="text-sm text-slate-600">Bring water to a rolling boil for at least 1 minute (3 minutes at high altitudes) to kill bacteria, viruses, and parasites.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 border-b border-slate-100 pb-3">
                <div className="bg-green-100 text-green-700 h-8 w-8 rounded flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <strong className="block text-slate-800">Chlorination</strong>
                  <span className="text-sm text-slate-600">Use 2 drops of regular unscented household bleach (5-6%) per liter of clear water. Wait 30 minutes before drinking.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-100 text-green-700 h-8 w-8 rounded flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <strong className="block text-slate-800">Filtration</strong>
                  <span className="text-sm text-slate-600">Use a clean cloth or coffee filter to remove solid particles before boiling or chlorinating.</span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Info className="h-6 w-6 text-secondary" />
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="bg-white px-4 rounded-lg mb-2 border">
            <AccordionTrigger className="font-semibold">When should I report water quality issues to JalRakshak?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              You should report immediately if you notice sudden changes in color, persistent foul odor, visible sewage mixing, or if multiple people in your area report illness after consuming tap water. Do not wait for others to report.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-white px-4 rounded-lg mb-2 border">
            <AccordionTrigger className="font-semibold">Is RO (Reverse Osmosis) necessary for municipal water?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              If your municipal water is treated properly and your local pipelines are intact, RO is generally not necessary and wastes significant water. Simple boiling or standard carbon filtration is sufficient unless TDS levels are exceptionally high.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-white px-4 rounded-lg mb-2 border">
            <AccordionTrigger className="font-semibold">How long does it take for authorities to respond?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              Critical issues (like sewage mixing) are assigned within 4 hours. High-priority complaints are addressed within 24 hours. You can track the exact status and SLA compliance on your dashboard.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-white px-4 rounded-lg border">
            <AccordionTrigger className="font-semibold">What is a safe TDS level?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-4">
              According to WHO and BIS standards, TDS levels under 300 mg/L are excellent. Levels between 300-600 mg/L are good, 600-900 are fair, 900-1200 are poor, and above 1200 mg/L are unacceptable for drinking without treatment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}