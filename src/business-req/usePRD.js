import { useState, useCallback } from 'react';
import { STEPS } from './steps';

const initialAnswers = () =>
  Object.fromEntries(STEPS.map(s => [s.id, {}]));

export function usePRD() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [showPRD, setShowPRD] = useState(false);

  const current = STEPS[step];

  const setField = useCallback((stepId, fieldId, value) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], [fieldId]: value },
    }));
  }, []);

  const toggleChip = useCallback((stepId, fieldId, val) => {
    setAnswers(prev => {
      const arr = prev[stepId][fieldId] || [];
      const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
      return { ...prev, [stepId]: { ...prev[stepId], [fieldId]: next } };
    });
  }, []);

  const getField = useCallback((stepId, fieldId) => {
    const v = answers[stepId]?.[fieldId];
    return v ?? '';
  }, [answers]);

  const isStepComplete = useCallback((idx) => {
    const s = STEPS[idx];
    return s.fields
      .filter(f => f.req)
      .every(f => {
        const v = answers[s.id]?.[f.id];
        return Array.isArray(v) ? v.length > 0 : (v || '').trim().length > 0;
      });
  }, [answers]);

  const completedCount = STEPS.filter((_, i) => isStepComplete(i)).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  const goNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else setShowPRD(true);
  };

  const goBack = () => {
    if (showPRD) { setShowPRD(false); return; }
    if (step > 0) setStep(s => s - 1);
  };

  const goTo = (idx) => { setShowPRD(false); setStep(idx); };

  const buildPRD = () => {
    const get = (sId, fId) => {
      const v = answers[sId]?.[fId];
      return Array.isArray(v) ? v.join(', ') : (v || '');
    };
    return STEPS.map(s => {
      const lines = [`## ${s.title}`];
      s.fields.forEach(f => {
        const v = get(s.id, f.id);
        if (v) lines.push(`**${f.label}:** ${v}`);
      });
      return lines.join('\n');
    }).join('\n\n');
  };

  return {
    step, current, answers, showPRD,
    setField, toggleChip, getField,
    isStepComplete, progress, completedCount,
    goNext, goBack, goTo, setShowPRD, buildPRD,
  };
}
