import { TabsContent } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';

import { RoutesConfig } from '../../config/routes';
import { MilitaryForm } from '../../shared/components/certificates/militaryForm/militaryForm.component';

const MilitaryFormContent = () => {
  const generateLocalePath = useGenerateLocalePath();
  return (
    <TabsContent value={generateLocalePath(RoutesConfig.requestCertificate.index)} className="py-8">
      <MilitaryForm />
    </TabsContent>
  );
};

export default MilitaryFormContent;
