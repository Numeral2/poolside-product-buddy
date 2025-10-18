import { useState } from "react";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PhCalculator = () => {
  const [volume, setVolume] = useState<string>("");
  const [currentPh, setCurrentPh] = useState<string>("");
  const [targetPh, setTargetPh] = useState<string>("7.4");
  const [result, setResult] = useState<string | null>(null);

  const calculatePhAdjustment = () => {
    const vol = parseFloat(volume);
    const current = parseFloat(currentPh);
    const target = parseFloat(targetPh);

    if (isNaN(vol) || isNaN(current) || isNaN(target)) {
      setResult("Unesite sve vrijednosti");
      return;
    }

    if (vol <= 0) {
      setResult("Volumen mora biti veći od 0");
      return;
    }

    if (current < 0 || current > 14 || target < 0 || target > 14) {
      setResult("pH mora biti između 0 i 14");
      return;
    }

    const difference = Math.abs(target - current);
    
    // Approximate calculation: 100g of pH+/pH- changes pH by ~0.1 per 10m³
    const gramsPer01Change = 100; // grams needed per 0.1 pH change per 10m³
    const volumeFactor = vol / 10;
    const adjustmentGrams = (difference / 0.1) * gramsPer01Change * volumeFactor;

    if (current < target) {
      setResult(`Trebate ~${Math.round(adjustmentGrams)}g pH+ (natrijev karbonat) za podizanje pH`);
    } else if (current > target) {
      setResult(`Trebate ~${Math.round(adjustmentGrams)}g pH- (natrijev bisulfat) za spuštanje pH`);
    } else {
      setResult("pH vrijednost je već na ciljanoj razini");
    }
  };

  return (
    <div className="p-4 space-y-4 border-t">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 flex items-center justify-center"
             style={{ background: "var(--gradient-water)" }}>
          <Calculator className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-bold text-sm text-foreground">pH Kalkulator</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="volume" className="text-xs">Volumen bazena (m³)</Label>
          <Input
            id="volume"
            type="number"
            placeholder="npr. 50"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="currentPh" className="text-xs">Trenutna pH vrijednost</Label>
          <Input
            id="currentPh"
            type="number"
            step="0.1"
            placeholder="npr. 7.8"
            value={currentPh}
            onChange={(e) => setCurrentPh(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="targetPh" className="text-xs">Ciljna pH vrijednost</Label>
          <Input
            id="targetPh"
            type="number"
            step="0.1"
            placeholder="npr. 7.4"
            value={targetPh}
            onChange={(e) => setTargetPh(e.target.value)}
            className="h-8 text-xs"
          />
        </div>

        <Button
          onClick={calculatePhAdjustment}
          className="w-full h-8 text-xs text-white"
          style={{ background: "var(--gradient-water)" }}
        >
          Izračunaj
        </Button>

        {result && (
          <div className="p-3 bg-muted text-xs leading-relaxed border border-primary/20">
            {result}
          </div>
        )}

        <div className="text-[10px] text-muted-foreground leading-relaxed">
          <strong>Napomena:</strong> Idealna pH vrijednost za bazen je između 7.2 i 7.6. Ovo je približan izračun - uvijek dodajte kemikalije postupno i mjerite ponovo.
        </div>
      </div>
    </div>
  );
};

export default PhCalculator;