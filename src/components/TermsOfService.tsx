
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const TermsOfService = () => {
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      <AccordionItem value="terms">
        <AccordionTrigger className="text-sm text-gray-600 hover:text-gray-800">
          Terms of Service & Disclaimer
        </AccordionTrigger>
        <AccordionContent className="text-xs text-gray-600 space-y-3">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Disclaimer of Liability</h4>
            <p>
              Ease is provided "as is" without warranty of any kind. We are not responsible for any effects, 
              harm, or consequences that may result from using this application. Use at your own discretion 
              and seek professional help when needed.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Not Medical Advice</h4>
            <p>
              This app is not a substitute for professional medical, psychological, or therapeutic advice. 
              Always consult qualified healthcare professionals for serious mental health concerns.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">User Responsibility</h4>
            <p>
              You acknowledge that you use this service at your own risk. We disclaim all liability for 
              any direct, indirect, incidental, or consequential damages arising from your use of Ease.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Privacy & Data</h4>
            <p>
              Your conversations may be processed for functionality purposes. We strive to protect your 
              privacy but cannot guarantee complete security of transmitted data.
            </p>
          </div>
          
          <p className="text-xs text-gray-500 pt-2 border-t">
            By using Ease, you agree to these terms and acknowledge the limitations and risks involved.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TermsOfService;
